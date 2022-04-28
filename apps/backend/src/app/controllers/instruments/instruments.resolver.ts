import { UseGuards } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { FirebaseGuard } from "../../middleware/firebase.guard";
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
}
