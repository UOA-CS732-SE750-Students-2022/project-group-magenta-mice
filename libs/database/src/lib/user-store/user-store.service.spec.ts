import { Test, TestingModule } from "@nestjs/testing";
import { UserStoreService } from "./user-store.service";

describe("UserStoreService", () => {
  let service: UserStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStoreService],
    }).compile();

    service = module.get<UserStoreService>(UserStoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
