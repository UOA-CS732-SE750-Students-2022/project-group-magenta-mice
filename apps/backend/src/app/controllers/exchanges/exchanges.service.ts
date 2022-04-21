import { Injectable } from "@nestjs/common";
import { ExchangeStoreService } from "@simulate-exchange/database";
import { CreateExchangeInput } from "./dto/create-exchange.input";
import { CreateInviteInput } from "./dto/create-invite.input";
import { Exchange } from "./entities/exchange.entity";

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
}
