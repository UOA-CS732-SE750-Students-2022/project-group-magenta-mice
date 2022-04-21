import { Module } from "@nestjs/common";
import { DatabaseModule } from "@simulate-exchange/database";
import { InstrumentsResolver } from "./instruments.resolver";
import { InstrumentsService } from "./instruments.service";

@Module({
  providers: [InstrumentsResolver, InstrumentsService],
  imports: [DatabaseModule],
})
export class InstrumentsModule {}
