import { InstrumentType } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { ExchangeStoreService } from "@simulate-exchange/database";
import { AddInstrumentDto } from "./dto/add-instrument.input";
import { CreateExchangeInput } from "./dto/create-exchange.input";
import { CreateInviteInput } from "./dto/create-invite.input";

@Injectable()
export class ExchangesService {
  constructor(private readonly exchangeStore: ExchangeStoreService) {}

  async findOne(id: string) {
    return await this.exchangeStore.findById(id);
  }

  async createInvite(createInviteInput: CreateInviteInput) {
    return await this.exchangeStore.createOrGetInvite(
      createInviteInput.exchangeId,
      createInviteInput.userId,
    );
  }

  async checkInvite(inviteId: string, userId: string) {
    return await this.exchangeStore.checkInvite(inviteId, userId);
  }

  async joinExchange(userId: string, inviteId: string) {
    try {
      return await this.exchangeStore.joinExchange(userId, inviteId);
    } catch (err) {
      console.log(err);
    }
  }

  async createTestExchange(userId: string) {
    return await this.exchangeStore.createTestExchange(userId);
  }

  async createExchange(uid: string, name: CreateExchangeInput) {
    return await this.exchangeStore.createExchange(
      uid,
      name.exchangeColor,
      name.exchangeName,
    );
  }

  async deleteExchange(exchangeId: string) {
    return await this.exchangeStore.deleteExchange(exchangeId);
  }

  async addInstrument(
    userId: string,
    exchangeId: string,
    instrument: AddInstrumentDto,
  ) {
    //TODO: CHECK EXCHANGE OWNERSHIP

    let typeEnum;
    if (instrument.instrumentType === "stock") {
      typeEnum = InstrumentType.STOCK;
    } else {
      typeEnum = InstrumentType.BOND;
    }

    return await this.exchangeStore.addInstrument(exchangeId, {
      ...instrument,
      instrumentType: typeEnum,
    });
  }

  async editInstrument(
    userId: string,
    exchangeId: string,
    instrumentId: string,
    instrument: AddInstrumentDto,
  ) {
    let typeEnum;
    if (instrument.instrumentType === "stock") {
      typeEnum = InstrumentType.STOCK;
    } else {
      typeEnum = InstrumentType.BOND;
    }
    return await this.exchangeStore.editInstrument(exchangeId, instrumentId, {
      ...instrument,
      instrumentType: typeEnum,
    });
  }

  async deleteInstrument(instrumentId: string) {
    return await this.exchangeStore.deleteInstrument(instrumentId);
  }
}
