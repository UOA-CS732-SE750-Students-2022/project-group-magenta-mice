import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateInviteInput {
  @Field()
  exchangeId: string;

  @Field({ nullable: true })
  userId: string;
}
