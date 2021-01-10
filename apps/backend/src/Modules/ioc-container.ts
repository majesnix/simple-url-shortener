import http from "http";
import express, { Express } from "express";
import { Connection, getConnection } from "typeorm";
import { Container, decorate, injectable } from "inversify";
import { Controller } from "tsoa";
import { SocketManager } from "./SocketManager";
import { DummySocketManager } from "../1 - REST Interface/Socket/DummySocketManager";

decorate(injectable(), Controller);

const iocContainer = new Container();

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

// Add your SocketManager implementation here
iocContainer
  .bind<SocketManager>("SocketManager")
  .to(DummySocketManager)
  .inSingletonScope();

export { iocContainer };
