import { ObjectType, Field } from "@nestjs/graphql";
import { UserPermission } from "../../users/entities/permissions.entity";
import { Instrument } from "../../instruments/entities/instrument.entity";

@ObjectType()
export class Exchange {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  public: boolean;

  @Field(() => [UserPermission])
  userPermissions: UserPermission[];

  @Field(() => [Instrument])
  instruments: Instrument[];
}
