import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAny() {
    const user = await this.prismaService.user.findFirst();
    return user;
  }

  async createUser(name: string, pppic: string, id: string) {
    this.prismaService.user.create({
      data: {
        name,
        profilePicUrl: pppic,
        id,
      },
    });

    const success = true;
    return success;
  }
}
