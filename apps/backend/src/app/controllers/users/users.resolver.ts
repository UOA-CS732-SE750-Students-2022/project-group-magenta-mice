import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { FirebaseGuard } from "../../middleware/firebase.guard";
import { CurrentUser } from "../../util/current-user.decorator";
import { DecodedIdToken } from "firebase-admin/auth";

@UseGuards(FirebaseGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
    @CurrentUser() name: DecodedIdToken,
  ) {
    console.log(name.uid);
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  async findOne(@Args("id", { type: () => Int }) id: number) {
    const user = await this.usersService.findOne(id);
    return {
      exampleField: user.name,
    };
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
