import { Module } from "@nestjs/common";
import { ExchangesService } from "./exchanges.service";
import { ExchangesResolver } from "./exchanges.resolver";
import { DatabaseModule } from "@simulate-exchange/database";

@Module({
  imports: [DatabaseModule],
  providers: [ExchangesResolver, ExchangesService],
})
export class ExchangesModule {}
