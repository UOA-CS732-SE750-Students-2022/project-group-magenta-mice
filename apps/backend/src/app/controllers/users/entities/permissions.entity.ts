import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Exchange } from "../../exchanges/entities/exchange.entity";
import { Permission } from "./enums/permission";
import { User } from "./user.entity";

@ObjectType()
export class UserPermission {
  @Field(() => ID)
  id: string;

  @Field(() => Exchange)
  exchange: Exchange;

  @Field(() => User)
  user: User;

  @Field(() => Permission)
  permission: Permission;
}
