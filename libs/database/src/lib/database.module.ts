import { ExchangeStoreService } from './exchange-store/exchange-store.service';
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserStoreService } from "./user-store/user-store.service";

@Module({
  imports: [PrismaModule],
  providers: [UserStoreService, ExchangeStoreService],
  exports: [UserStoreService, ExchangeStoreService],
})
export class DatabaseModule {}
