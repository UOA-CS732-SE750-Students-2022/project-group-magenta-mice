import { ExchangeStoreService } from "./exchange-store/exchange-store.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserStoreService } from "./user-store/user-store.service";
import { InstrumentStoreService } from "./instrument-store/instrument-store.service";

@Module({
  imports: [PrismaModule],
  providers: [UserStoreService, ExchangeStoreService, InstrumentStoreService],
  exports: [UserStoreService, ExchangeStoreService, InstrumentStoreService],
})
export class DatabaseModule {}
