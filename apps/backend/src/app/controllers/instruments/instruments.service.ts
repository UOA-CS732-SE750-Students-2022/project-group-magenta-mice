import { Injectable } from "@nestjs/common";
import { InstrumentStoreService } from "@simulate-exchange/database";

@Injectable()
export class InstrumentsService {
  constructor(private readonly instrumentStore: InstrumentStoreService) {}

  async getInstrument(id: string) {
    return await this.instrumentStore.getInstrument(id);
  }

  async getRecentTrades(id: string, limit: number) {
    return await this.instrumentStore.getRecentTrades(id, limit);
  }
}
