import { Field, InputType } from "type-graphql";

@InputType()
export default class UrlArgs {
  @Field()
  public ShortUrl: string;
}
