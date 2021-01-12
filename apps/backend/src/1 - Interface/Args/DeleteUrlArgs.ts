import { Field, InputType } from "type-graphql";

@InputType()
export default class DeleteUrlArgs {
  @Field()
  public Id: string;

  @Field()
  public Short: string;
}
