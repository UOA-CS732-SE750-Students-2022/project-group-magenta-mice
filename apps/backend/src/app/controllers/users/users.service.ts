import { Injectable } from "@nestjs/common";
import { UserStoreService } from "@simulate-exchange/database";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(private readonly userStore: UserStoreService) {}

  create(createUserInput: CreateUserInput) {
    return this.userStore.createUser(
      createUserInput.name,
      createUserInput.profilePicUrl,
      createUserInput.id,
    );
  }

  async findById(id: string) {
    const user = await this.userStore.findById(id);
    return user;
  }
}
