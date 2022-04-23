import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class AddInstrumentDto {
  @Field()
  instrumentType: string;

  @Field()
  name: string;

  @Field(() => Int)
  positionLimit: number;

  @Field(() => Int)
  tickSizeMin: number;
}
