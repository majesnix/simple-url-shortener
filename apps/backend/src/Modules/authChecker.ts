import { AuthChecker } from "type-graphql";
import jwt, { Algorithm } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Context, Token } from "../types";

const client = jwksClient({
  jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    cb(null, key.getPublicKey());
  });
}

const options = {
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ["RS256"] as Algorithm[],
};

const authChecker: AuthChecker<Context> = async (
  { context },
  roles
): Promise<boolean> => {
  const verifiedAndDecoded = new Promise((resolve, reject) => {
    jwt.verify(context.token, getKey, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  }).catch((err) => console.error(err));

  return !!verifiedAndDecoded.then((res: Token) => {
    return res.scope.split(" ").some((s) => roles.includes(s));
  });
};

export default authChecker;
