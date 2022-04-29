import { ObjectType, Field, Int } from "@nestjs/graphql";
import { UserPermission } from "../../users/entities/permissions.entity";
import { Instrument } from "../../instruments/entities/instrument.entity";

@ObjectType()
export class Exchange {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  colour: number;

  @Field()
  public: boolean;

  @Field(() => [UserPermission])
  userPermissions: UserPermission[];

  @Field(() => [Instrument])
  instruments: Instrument[];
}
