import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ExchangeStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAny() {
    const exchange = await this.prismaService.exchange.findFirst();
    return exchange;
  }

  async findById(id: string) {
    const exchange = await this.prismaService.exchange.findFirst({ where: { id }, include: { userPermissions: { include: { user: true } } } });
    return exchange;
  }

  async createOrGetInvite(exchangeId: string, userId: string) {
    const invite = await this.prismaService.invite.findFirst({ where: { exchangeId, userId } });
    if (invite) {
      return invite;
    }
    return this.prismaService.invite.create({ data: { exchangeId, userId }});
  }

  async checkInvite(inviteId: string, userId: string) {
    const invite = await this.prismaService.invite.findFirst({ where: { id: inviteId } });
    if (invite) {
      const userPermission = await this.prismaService.userPermission.findFirst({ where: { userId, exchangeId: invite.exchangeId } });
      if (userPermission) {
        return "Already a member of the exchange"
      }
      return ""
    }
    return "Invite is invalid";
  }

  async joinExchange(userId: string, inviteId: string) {
    const invite = await this.prismaService.invite.findFirst({ where: { id: inviteId } });
    const exchange = await this.prismaService.exchange.findFirst({ where: { id: invite.exchangeId } });
    return await this.prismaService.userPermission.create({ data: { userId, exchangeId: exchange.id, permission: "USER" }, include: { exchange: true }});
  }

  async createTestExchange(userId: string) {
    const exchange = await this.prismaService.exchange.create({ data: {} });
    await this.prismaService.userPermission.create({ data: { userId, exchangeId: exchange.id, permission: "ADMIN" }});
    return exchange;
  }
}
