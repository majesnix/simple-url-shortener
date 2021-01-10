import { Field, InputType } from "type-graphql";

@InputType()
export default class LoginArgs {
  @Field()
  public Username: string;

  @Field()
  public Email: string;

  @Field()
  public Password: string;
}
