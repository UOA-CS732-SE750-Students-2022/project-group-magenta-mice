import { Injectable } from "@nestjs/common";
import { ExchangeStoreService } from "@simulate-exchange/database";
import { CreateInviteInput } from "./dto/create-invite.input";

@Injectable()
export class ExchangesService {
  constructor(private readonly exchangeStore: ExchangeStoreService) {}

  async findOne(id: string) {
    return await this.exchangeStore.findById(id);
  }

  async createInvite(createInviteInput: CreateInviteInput) {
    return await this.exchangeStore.createOrGetInvite(createInviteInput.exchangeId, createInviteInput.userId);
  }

  async checkInvite(id: string) {
    const invite = await this.exchangeStore.checkInvite(id);
    return !!invite
  }

  async joinExchange(userId: string, inviteId: string) {
    return await this.exchangeStore.joinExchange(userId, inviteId);
  }

  async createTestExchange(userId: string) {
    return await this.exchangeStore.createTestExchange(userId);
  }
}
