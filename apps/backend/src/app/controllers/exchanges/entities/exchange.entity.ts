import { ObjectType, Field } from "@nestjs/graphql";
import { UserPermission } from "../../users/entities/permissions.entity";

@ObjectType()
export class Exchange {
  @Field()
  id: string;

  @Field()
  public: boolean;

  @Field(() => [UserPermission])
  userPermissions: UserPermission[]
}
