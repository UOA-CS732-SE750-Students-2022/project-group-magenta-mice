import { CreateInviteInput } from './dto/create-invite.input';
import { Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql";
import { ExchangesService } from "./exchanges.service";
import { Exchange } from "./entities/exchange.entity";
import { Invite } from "./entities/invite.entity";
import { CurrentUser } from '../../util/current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from '../../middleware/firebase.guard';
import { UserPermission } from '../users/entities/permissions.entity';

@UseGuards(FirebaseGuard)
@Resolver(() => Exchange)
export class ExchangesResolver {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Query(() => Exchange, { name: "exchange" })
  async findExchange(@Args("id", { type: () => ID }) id: string) {
    return await this.exchangesService.findOne(id);
  }

  @Mutation(() => Invite)
  async createInvite(
    @Args("createInviteInput") createInviteInput: CreateInviteInput,
    @CurrentUser() name: DecodedIdToken,
  ) {
    createInviteInput.userId = name.uid
    return await this.exchangesService.createInvite(createInviteInput);
  }

  @Query(() => Boolean)
  async checkInvite(@Args("id", { type: () => ID }) id: string) {
    return await this.exchangesService.checkInvite(id);
  }

  @Mutation(() => UserPermission)
  async joinExchange(@CurrentUser() name: DecodedIdToken, @Args("id") inviteId: string) {
    return await this.exchangesService.joinExchange(name.uid, inviteId);
  }

  @Mutation(() => Exchange)
  async createTestExchange(@CurrentUser() name: DecodedIdToken) {
    return await this.exchangesService.createTestExchange(name.uid);
  }
}
