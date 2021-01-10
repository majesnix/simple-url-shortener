// Importing all Controllers here, otherwise tsoa is not able to find them
// and is not able to build routes and swagger definitions for us.
import "reflect-metadata";

import UrlResolver from "./1 - Interface/Resolvers/UrlResolver";
import UserResolver from "./1 - Interface/Resolvers/UserResolver";
import authChecker from "./Modules/authChecker";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { iocContainer } from "./Modules/ioc-container";
import { User } from "./3 - Database/Models/User";
import { Url } from "./3 - Database/Models/Url";

const { APPLICATION_NX_PORT } = process.env;

(async () => {
  // First we make sure we can connect to the database
  await createConnection({
    url: process.env.DB,
    type: "postgres",
    synchronize: true,
    entities: [Url, User]
  });

  // Then we can start our express web server
  const app = express();

  // Standard middleware
  app.use(cors());

  // GraphQL
  const schema = await buildSchema({
    resolvers: [UrlResolver, UserResolver],
    container: iocContainer,
    authChecker: authChecker,
  });

  app.use(
    "/gql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  // Error handling
  app.use(
    (err: any, req: express.Request, res: express.Response, next: any) => {
      if (err.status && err.status === 401) {
        // Not authorized or authenticated - Return info to user
        res.status(401).json(err.message);
      } else if (err.status && err.status === 400) {
        // The developer made an error. Return the error to the developer
        res.status(400).json(err.message);
      } else {
        // We fucked up - Only return HTTP 500 and log the error
        console.log("[ERROR]", "Internal error", err);
        res.status(500);
        res.end();
      }
    }
  );

  app.listen(APPLICATION_NX_PORT || 4000, () =>
    console.log(`Service is listening on port ${APPLICATION_NX_PORT || 4000}`)
  );
})();
