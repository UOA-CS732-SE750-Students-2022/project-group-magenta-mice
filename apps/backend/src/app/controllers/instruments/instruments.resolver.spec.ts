import { Test, TestingModule } from "@nestjs/testing";
import { InstrumentsResolver } from "./instruments.resolver";
import { InstrumentsService } from "./instruments.service";

describe("InstrumentsResolver", () => {
  let resolver: InstrumentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentsResolver, InstrumentsService],
    }).compile();

    resolver = module.get<InstrumentsResolver>(InstrumentsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
