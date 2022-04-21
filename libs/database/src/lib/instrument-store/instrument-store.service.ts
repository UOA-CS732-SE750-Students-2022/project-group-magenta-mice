import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InstrumentStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async getInstrument(id: string) {
    return await this.prismaService.instrument.findFirst({
      where: { id },
    });
  }
}
