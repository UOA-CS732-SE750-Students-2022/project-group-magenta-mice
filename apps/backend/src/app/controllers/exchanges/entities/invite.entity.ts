import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Invite {
  @Field(() => ID)
  id: string

  @Field()
  exchangeId: string;

  @Field({ nullable: true })
  userId: string
}

@ObjectType()
export class InviteResponse {
  @Field()
  error: string
}
