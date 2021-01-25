import { Field, InputType } from "type-graphql";

@InputType()
export default class UrlInputType {
  @Field()
  public Short: string;
}
