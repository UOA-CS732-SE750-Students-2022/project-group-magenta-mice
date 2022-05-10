import { Injectable } from "@nestjs/common";
import {
  ExchangeStoreService,
  UserStoreService,
} from "@simulate-exchange/database";
import { CreateUserInput } from "./dto/create-user.input";

@Injectable()
export class UsersService {
  constructor(
    private readonly userStore: UserStoreService,
    private readonly exchangeStore: ExchangeStoreService,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userStore.createUser(
      createUserInput.name,
      createUserInput.email,
      createUserInput.profilePicUrl,
      createUserInput.id,
    );
  }

  async findById(id: string) {
    const user = await this.userStore.findById(id);
    return user;
  }

  async profitLoss(userId: string, exchange: string) {
    const profitLossPerInstrument = await this.exchangeStore.getProfitLoss(
      exchange,
      userId,
    );

    return Object.entries(profitLossPerInstrument).reduce<number>(
      (acc, [, profitLoss]) => acc + profitLoss,
      0,
    );
  }
}
