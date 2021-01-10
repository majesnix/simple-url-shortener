import express, { Express } from "express";
import http from "http";
import { Container, decorate, injectable } from "inversify";
import { Controller } from "tsoa";
import { Connection, getConnection } from "typeorm";
import UrlResolver, {
  IUrlResolver,
} from "../1 - Interface/Resolvers/UrlResolver";
import UserResolver, {
  IUserResolver,
} from "../1 - Interface/Resolvers/UserResolver";
import { IUrlService, UrlService } from "../2 - Domain/Services/UrlService";
import { IUserService, UserService } from "../2 - Domain/Services/UserService";

decorate(injectable(), Controller);

const iocContainer = new Container();

iocContainer.bind<IUrlResolver>(UrlResolver).to(UrlResolver).inTransientScope();

iocContainer
  .bind<IUserResolver>(UserResolver)
  .to(UserResolver)
  .inTransientScope();

iocContainer.bind<IUrlService>("IUrlService").to(UrlService).inTransientScope();
iocContainer
  .bind<IUserService>("IUserService")
  .to(UserService)
  .inTransientScope();

iocContainer
  .bind<Connection>("ConnectionProvider")
  .toDynamicValue(() => getConnection())
  .inSingletonScope();

iocContainer
  .bind<Express>("ExpressServer")
  .toDynamicValue(() => express())
  .inSingletonScope();

iocContainer
  .bind<http.Server>("HttpServer")
  .toDynamicValue(() =>
    http.createServer(iocContainer.get<Express>("ExpressServer"))
  )
  .inSingletonScope();

export { iocContainer };
