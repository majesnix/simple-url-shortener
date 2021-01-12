import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";

class Auth {
  public client: Auth0Client;
  isReady = false;

  async init() {
    try {
      if (this.isReady) {
        return;
      }
      const {
        NX_AUTH0_SCOPES,
        NX_AUTH0_CALLBACK_URL,
        NX_AUTH0_DOMAIN,
        NX_AUTH0_CLIENT_ID,
        NX_AUTH0_AUDIENCE,
      } = process.env;

      this.client = await createAuth0Client({
        domain: NX_AUTH0_DOMAIN,
        client_id: NX_AUTH0_CLIENT_ID,
        redirect_uri: NX_AUTH0_CALLBACK_URL,
        scope: NX_AUTH0_SCOPES,
        audience: NX_AUTH0_AUDIENCE,
        cacheLocation: "memory",
      });
      this.isReady = true;
    } catch (err) {
      this.isReady = false;
    }
  }
}

export default new Auth();
