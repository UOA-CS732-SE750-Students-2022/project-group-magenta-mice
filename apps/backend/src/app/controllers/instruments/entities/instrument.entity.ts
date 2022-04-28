import { ObjectType, Field, ID, Int } from "@nestjs/graphql";

@ObjectType()
export class Instrument {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  tickSizeMin: number;

  @Field(() => Int)
  positionLimit: number;
}
