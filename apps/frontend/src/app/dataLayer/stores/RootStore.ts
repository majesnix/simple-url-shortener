import { model, Model, prop } from "mobx-keystone";
import App from "../models/App";

@model("RootStore")
export default class RootStore extends Model({
  app: prop<App>(),
}) {}
