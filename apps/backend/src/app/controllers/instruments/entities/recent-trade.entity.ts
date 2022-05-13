import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RecentTrade {
  @Field()
  instrumentId: string;

  @Field()
  price: number;
}
