import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ValidationError } from "apollo-server-express";
import { InstrumentType, Side } from ".prisma/client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ExchangeRequest } from "./exchange-request";

@Injectable()
export class ExchangeStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAny() {
    const exchange = await this.prismaService.exchange.findFirst();
    return exchange;
  }

  async findById(id: string) {
    const exchange = await this.prismaService.exchange.findFirst({
      where: { id },
      include: {
        userPermissions: { include: { user: true } },
        instruments: true,
      },
    });
    if (!exchange) throw new ValidationError("Exchange not found");

    return exchange;
  }

  async createOrGetInvite(exchangeId: string, userId: string) {
    return await this.prismaService.invite.upsert({
      where: { key: { userId, exchangeId } },
      create: { userId, exchangeId },
      update: {},
    });
  }

  async checkInvite(inviteId: string, userId: string) {
    const invite = await this.prismaService.invite.findFirst({
      where: { id: inviteId },
    });
    if (invite) {
      const userPermission = await this.prismaService.userPermission.findFirst({
        where: { userId, exchangeId: invite.exchangeId },
      });
      if (userPermission) {
        throw new ValidationError("Already a member of this exchange");
      }
      return true;
    }
    throw new ValidationError("Invite not found");
  }

  async generateApiKey(userId: string, exchangeId: string, forceNew: boolean) {
    const userPermission = await this.prismaService.userPermission.findFirst({
      where: { userId, exchangeId },
    });
    if (!userPermission) {
      throw new ValidationError("User not a member of this exchange");
    }

    if (forceNew || !userPermission.apiKey) {
      return await this.prismaService.userPermission.update({
        where: { id: userPermission.id },
        data: {
          apiKey: uuidv4(),
        },
      });
    } else {
      return userPermission;
    }
  }

  async joinExchange(userId: string, inviteId: string) {
    const invite = await this.prismaService.invite.findFirst({
      where: { id: inviteId },
    });
    const exchange = await this.prismaService.exchange.findFirst({
      where: { id: invite.exchangeId },
    });

    if (exchange) {
      const userPermission = await this.prismaService.userPermission.findFirst({
        where: { userId, exchangeId: invite.exchangeId },
      });
      if (userPermission) {
        throw new ValidationError("Already a member of this exchange");
      }

      return await this.prismaService.userPermission.create({
        data: {
          apiKey: uuidv4(),
          userId,
          exchangeId: invite.exchangeId,
          permission: "USER",
        },
        include: { exchange: true },
      });
    }

    throw new ValidationError("Already a member of this exchange");
  }

  async createTestExchange(userId: string) {
    const exchange = await this.prismaService.exchange.create({
      data: { colour: 1, name: "Test Exchange" },
    });
    await this.prismaService.userPermission.create({
      data: { userId, exchangeId: exchange.id, permission: "ADMIN" },
    });
    return exchange;
  }

  async createExchange(uid: string, color: number, name: string) {
    const exchange = await this.prismaService.exchange.create({
      data: {
        colour: color,
        name,
        userPermissions: {
          create: {
            userId: uid,
            permission: "ADMIN",
          },
        },
      },
      include: {
        userPermissions: true,
      },
    });
    return exchange;
  }

  async editExchange(exchangeId: string, color: number, newName: string) {
    const exchange = await this.prismaService.exchange.update({
      where: { id: exchangeId },
      data: {
        colour: color,
        name: newName,
      },
    });
    return exchange;
  }

  async deleteExchange(exchangeId: string) {
    const exchange = await this.prismaService.exchange.delete({
      where: { id: exchangeId },
    });
    return exchange;
  }

  async addInstrument(
    exchangeId: string,
    data: {
      instrumentType: InstrumentType;
      name: string;
      positionLimit: number;
      tickSizeMin: number;
    },
  ) {
    const instrument = await this.prismaService.instrument.create({
      data: {
        exchangeId,
        ...data,
      },
    });
    return instrument;
  }
  async editInstrument(
    exchangeId: string,
    instrumentId: string,
    data: {
      instrumentType: InstrumentType;
      name: string;
      positionLimit: number;
      tickSizeMin: number;
    },
  ) {
    const instrument = await this.prismaService.instrument.update({
      where: { id: instrumentId },
      data: {
        exchangeId,
        ...data,
      },
    });
    return instrument;
  }

  async deleteInstrument(instrumentId: string) {
    const instrument = await this.prismaService.instrument.delete({
      where: { id: instrumentId },
    });
    return instrument;
  }

  async getProfitLoss(exchangeId: string, userId: string) {
    type TradeProducts = {
      product: number;
      instrumentId: string;
      side: Side;
      volume: number;
    }[];
    type MostRecent = { instrumentId: string; id: number; price: number }[];

    const volPriceProduct: TradeProducts = await this.prismaService.$queryRaw`
      SELECT
        sum(price*volume) AS product,
        sum(volume) as volume,
        "instrumentId",
        "side"
      FROM
        "public"."Trade"
      WHERE
        "Trade"."userId"=${userId} AND
        "Trade"."exchangeId"=${exchangeId}
      GROUP BY
        "Trade"."instrumentId",
        "Trade"."side";
    `;

    const mostRecentTrades: MostRecent = await this.prismaService.$queryRaw`
      SELECT DISTINCT ON ("instrumentId")
        "instrumentId",
        id,
        price
      FROM
        public."Trade"
      ORDER BY
        "instrumentId",
        id
      DESC;
    `;

    const keyedRecent = mostRecentTrades.reduce(
      (acc, curr) => ({ ...acc, [curr.instrumentId]: curr }),
      {},
    );

    const cashPerInstrument = volPriceProduct.reduce((acc, curr) => {
      const next = { ...acc };
      if (!next[curr.instrumentId]) {
        next[curr.instrumentId] = 0;
      }

      if (curr.side === "ASK") {
        next[curr.instrumentId] +=
          curr.product - curr.volume * keyedRecent[curr.instrumentId].price;
      } else {
        next[curr.instrumentId] +=
          -curr.product + curr.volume * keyedRecent[curr.instrumentId].price;
      }

      return next;
    }, {} as { [instrument: string]: number });

    return cashPerInstrument;
  }

  async startExchange(userId: string, exchangeId: string) {
    const userPermission = await this.prismaService.userPermission.findFirst({
      where: { userId, exchangeId },
    });
    if (!userPermission) {
      throw new ValidationError("User not a member of this exchange");
    }

    if (userPermission.permission !== "ADMIN") {
      throw new ValidationError("User not an admin of this exchange");
    }

    const marketMakerKey = uuidv4();

    await this.prismaService.exchange.update({
      where: { id: exchangeId },
      data: {
        marketMakerKey,
      },
    });

    const exchange = await this.prismaService.exchange.findFirst({
      where: { id: exchangeId },
      include: {
        instruments: true,
      },
    });

    const request: ExchangeRequest = {
      exchangeId: exchange.id,
      instruments: exchange.instruments.map((instrument, index) => ({
        name: instrument.name,
        type: instrument.instrumentType.toString(),
        ordinal: index,
        positionLimit: instrument.positionLimit,
        tickSize: instrument.tickSizeMin,
        volatility:
          instrument.instrumentType === "BOND"
            ? instrument.bondVolatility
            : instrument.stockVolatility,
        basePrice:
          instrument.instrumentType === "BOND"
            ? instrument.bondFixedPrice
            : instrument.stockInitialPrice,
        id: instrument.id,
      })),
      marketMakerKey,
    };

    const base = process.env.ORCHESTRATOR_API ?? "http://localhost:8008";
    const res = await axios.post<string>(base + "/exchange", request);

    if (res.status === 200) {
      await this.prismaService.exchange.update({
        where: { id: exchangeId },
        data: {
          port: res.data,
        },
      });
      return res.data;
    } else {
      throw new Error("Failed to start exchange: " + res.data);
    }
  }
}
