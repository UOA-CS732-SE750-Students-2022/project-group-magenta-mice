import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "Example field (placeholder)" })
  exampleField: number;
}
