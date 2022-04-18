import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
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

  @Query(() => User, { name: "currentUser" })
  async currentUser(@CurrentUser() user: DecodedIdToken) {
    return await this.usersService.findById(user.uid);
  }
}
