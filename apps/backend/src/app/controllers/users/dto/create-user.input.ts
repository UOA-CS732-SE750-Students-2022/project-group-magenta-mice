import { InputType, Int, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => ID, { description: "Google Id" })
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true, description: "Google ProfilePic of user" })
  profilePicUrl: string;
}
