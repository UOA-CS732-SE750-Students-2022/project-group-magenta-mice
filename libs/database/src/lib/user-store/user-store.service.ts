import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAny() {
    const user = await this.prismaService.user.findFirst();
    return user;
  }
}
