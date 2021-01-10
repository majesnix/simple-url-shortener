import express from 'express';
import { inject, injectable } from 'inversify';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IUserService } from '../../2 - Domain/Services/UserService';
import { User } from '../../3 - Database/Models/User';

interface LoginArgs {
  username: string;
  email: string;
  password: string;
}

export interface IUserResolver {
  Login(
    loginArgs: LoginArgs,
    context: express.Request
  ): Promise<string | boolean>;
}

@injectable()
@Resolver(User)
export default class UserResolver implements IUserResolver {
  private readonly _userService: IUserService;

  constructor(@inject('IUserService') userService: IUserService) {
    this._userService = userService;
  }

  @Query((returns) => [String])
  public async Login(
    @Arg('loginArgs') loginArgs: LoginArgs,
    @Ctx() context: express.Request
  ): Promise<string | boolean> {
    return await this._userService.CheckLogin(
      loginArgs.password,
      loginArgs.username,
      loginArgs.email
    );
  }
}
