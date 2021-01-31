import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateShortUrlArgs {
  @Field()
  public Url: string;
}
