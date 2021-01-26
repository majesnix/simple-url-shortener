import { AuthChecker } from "type-graphql";
import jwt, { Algorithm } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Context, Token } from "../types";
import { AuthenticationError } from "apollo-server-express";

// init jwks client
const client = jwksClient({
  jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
});

// helper to get the public key of auth0
function getKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    cb(null, key.getPublicKey());
  });
}

// setup auth0 options
const options = {
  audience: process.env.NX_AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ["RS256"] as Algorithm[],
};

const authChecker: AuthChecker<Context> = async (
  { context },
  roles
): Promise<boolean> => {
  const verifiedAndDecoded = new Promise((resolve, reject) => {
    // verify jwt
    jwt.verify(context.token, getKey, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  }).catch((err) => console.error(err));

  const token = (await verifiedAndDecoded) as Token;

  // finally check for includes scopes
  if (token?.scope.split(" ").some((s) => roles.includes(s))) {
    return true;
  } else {
    throw new AuthenticationError("UNAUTHENTICATED");
  }
};

export default authChecker;
