import { UserPermission } from './permissions.entity';
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field({nullable : true})
  profilePicUrl: string;

  @Field(() => ID, { description: "the google ID" })
  id: string;

  @Field(() => [UserPermission])
  userPermissions: UserPermission[]
}
