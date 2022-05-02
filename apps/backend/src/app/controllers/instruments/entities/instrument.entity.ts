import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { registerEnumType } from "@nestjs/graphql";
@ObjectType()
export class Instrument {
  @Field(() => ID)
  id: string;

  @Field(() => InstrumentType)
  instrumentType: InstrumentType;

  @Field()
  name: string;

  @Field(() => Int)
  tickSizeMin: number;

  @Field(() => Int)
  positionLimit: number;

  @Field(() => Int)
  bondFixedPrice?: number;

  @Field(() => Int)
  bondVolatility?: number;
}

export enum InstrumentType {
  BOND = "BOND",
  STOCK = "STOCK",
}

registerEnumType(InstrumentType, { name: "InstrumentType" });
