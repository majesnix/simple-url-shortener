import { inject, injectable } from "inversify";
import { Arg, Query, Resolver } from "type-graphql";
import { IUserService } from "../../2 - Domain/Services/UserService";
import { User } from "../../3 - Database/Models/User";
import LoginArgs from "../Args/LoginArgs";

export interface IUserResolver {
  Login(loginArgs: LoginArgs): Promise<string | boolean>;
}

@injectable()
@Resolver(User)
export default class UserResolver implements IUserResolver {
  private readonly _userService: IUserService;

  constructor(@inject("IUserService") userService: IUserService) {
    this._userService = userService;
  }

  @Query((returns) => [String])
  public async Login(
    @Arg("loginArgs") loginArgs: LoginArgs
  ): Promise<string | boolean> {
    return await this._userService.CheckLogin(
      loginArgs.Password,
      loginArgs.Username,
      loginArgs.Email
    );
  }
}
