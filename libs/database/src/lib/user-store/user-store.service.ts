import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAny() {
    const user = await this.prismaService.user.findFirst();
    return user;
  }

  async findById(id: string) {
    return await this.prismaService.user.findFirst({
      where: { id },
      include: {
        userPermissions: {
          include: {
            exchange: { include: { instruments: true, userPermissions: true } },
          },
        },
      },
    });
  }

  async createUser(name: string, email: string, pppic: string, id: string) {
    return await this.prismaService.user.upsert({
      where: {
        id,
      },
      create: {
        id,
        name,
        email,
        profilePicUrl: pppic,
      },
      update: {
        name,
        email,
        profilePicUrl: pppic,
      },
    });
  }
}
