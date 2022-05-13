import { UseGuards } from "@nestjs/common";
import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { FirebaseGuard } from "../../middleware/firebase.guard";
import { RecentTrade } from "./entities/recent-trade.entity";
import { Instrument } from "./entities/instrument.entity";
import { InstrumentsService } from "./instruments.service";

@UseGuards(FirebaseGuard)
@Resolver(() => Instrument)
export class InstrumentsResolver {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @ResolveField()
  async name(@Parent() instrument: Instrument) {
    return (await this.instrumentsService.getInstrument(instrument.id)).name;
  }

  @ResolveField()
  async tickSizeMin(@Parent() instrument: Instrument) {
    return (await this.instrumentsService.getInstrument(instrument.id))
      .tickSizeMin;
  }

  @ResolveField()
  async positionLimit(@Parent() instrument: Instrument) {
    return (await this.instrumentsService.getInstrument(instrument.id))
      .positionLimit;
  }

  @ResolveField(() => [RecentTrade])
  async recentTrades(
    @Parent() instrument: Instrument,
    @Args("limit") limit: number,
  ) {
    return await this.instrumentsService.getRecentTrades(instrument.id, limit);
  }
}
