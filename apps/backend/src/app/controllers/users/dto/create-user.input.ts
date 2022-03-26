import { InputType, Int, Field, ID } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => ID, { description: "Google Id" })
  id: string;

  @Field({ description: "Name of user" })
  name: string;

  @Field({ description: "Google ProfilePic of user" })
  profilePicUrl: string;
}
