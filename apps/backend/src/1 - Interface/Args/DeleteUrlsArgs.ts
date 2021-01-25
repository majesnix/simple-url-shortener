import { Field, InputType } from "type-graphql";
import UrlInputType from "./UrlInputType";

@InputType()
export default class DeleteUrlsArgs {
  @Field((type) => [UrlInputType])
  public Urls: UrlInputType[];
}
