import { Injectable } from "@nestjs/common";
import { UserStoreService } from "@simulate-exchange/database";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(private readonly userStore: UserStoreService) {}

  create(createUserInput: CreateUserInput) {
    return this.userStore.createUser(createUserInput.name,createUserInput.profilePicUrl,createUserInput.id)
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.userStore.findAny();
    return user;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
