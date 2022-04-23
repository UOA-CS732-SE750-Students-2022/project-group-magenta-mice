import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateExchangeInput {
  @Field()
  exchangeName: string;

  @Field(() => Int)
  exchangeColor: number;
}
