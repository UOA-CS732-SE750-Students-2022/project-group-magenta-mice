import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Exchange } from "../../exchanges/entities/exchange.entity";
import { User } from "./user.entity";

@ObjectType()
export class UserPermission {
  @Field(() => Exchange)
  exchange: Exchange;

  @Field(() => User)
  user: User;

  @Field()
  permission: string;
}

