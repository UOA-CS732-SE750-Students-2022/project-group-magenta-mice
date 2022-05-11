import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProfitLoss {
  @Field()
  instrument: string;

  @Field()
  profitLoss: number;
}
