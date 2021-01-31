import { _async, _await, model, Model, modelFlow, prop } from "mobx-keystone";
import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";

@model("App")
export default class App extends Model({
  auth0Initiated: prop(false),
  authenticated: prop(false),
}) {
  auth: Auth0Client;

  @modelFlow
  onInit = _async(function* (this: App) {
    try {
      const {
        NX_AUTH0_SCOPES,
        NX_AUTH0_CALLBACK_URL,
        NX_AUTH0_DOMAIN,
        NX_AUTH0_CLIENT_ID,
        NX_AUTH0_AUDIENCE,
      } = process.env;

      this.auth = yield* _await(
        createAuth0Client({
          domain: NX_AUTH0_DOMAIN,
          client_id: NX_AUTH0_CLIENT_ID,
          redirect_uri: NX_AUTH0_CALLBACK_URL,
          scope: NX_AUTH0_SCOPES,
          audience: NX_AUTH0_AUDIENCE,
          cacheLocation: "memory",
        })
      );
      this.auth0Initiated = true;
    } catch (err) {
      console.error(err);
    }
  });

  @modelFlow
  checkAuth = _async(function* (this: App) {
    try {
      if (!this.auth0Initiated) {
        yield* _await(this.onInit());
      }
      const isAuthenticated = yield* _await(this.auth.isAuthenticated());
      const token = yield* _await(this.auth.getTokenSilently());
      if (isAuthenticated || token) {
        this.authenticated = true;
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error checking auth", err);
      return false;
    }
  });
}
