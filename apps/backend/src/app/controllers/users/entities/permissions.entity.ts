import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class UserPermission {
  @Field()
  exchangeId: string;
}

