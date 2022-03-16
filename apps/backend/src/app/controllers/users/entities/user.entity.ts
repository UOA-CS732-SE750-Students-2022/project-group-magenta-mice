import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => String, { description: "Example field (placeholder)" })
  exampleField: string;
}
