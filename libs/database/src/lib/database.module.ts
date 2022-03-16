import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserStoreService } from "./user-store/user-store.service";

@Module({
  imports: [PrismaModule],
  providers: [UserStoreService],
  exports: [UserStoreService],
})
export class DatabaseModule {}
