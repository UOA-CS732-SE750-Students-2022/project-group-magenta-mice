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
    console.log(id)
   const a = await this.prismaService.exchange.findFirst({ where: { id }, include: { userPermissions: { include: { user: true } } } });
    console.log(a);
    return a;
  }

  async createOrGetInvite(exchangeId: string, userId: string) {
    const invite = await this.prismaService.invite.findFirst({ where: { exchangeId, userId } });
    if (invite) {
      return invite;
    }
    return this.prismaService.invite.create({ data: { exchangeId, userId }});
  }

  async checkInvite(id: string) {
    const invite = await this.prismaService.invite.findFirst({ where: { id } });
    return invite;
  }

  async joinExchange(userId: string, inviteId: string) {
    const invite = await this.prismaService.invite.findFirst({ where: { id: inviteId } });
    const exchange = await this.prismaService.exchange.findFirst({ where: { id: invite.exchangeId } });
    return await this.prismaService.userPermission.create({ data: { userId, exchangeId: exchange.id, permission: "USER" }});
  }

  async createTestExchange(userId: string) {
    const exchange = await this.prismaService.exchange.create({ data: {} });
    await this.prismaService.userPermission.create({ data: { userId, exchangeId: exchange.id, permission: "ADMIN" }});
    return exchange;
  }
}
