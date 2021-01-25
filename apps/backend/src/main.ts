// Importing all Controllers here, otherwise tsoa is not able to find them
// and is not able to build routes and swagger definitions for us.
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import UrlResolver from "./1 - Interface/Resolvers/UrlResolver";
import { Url } from "./3 - Database/Models/Url";
import { iocContainer } from "./Modules/ioc-container";
import authChecker from "./Modules/authChecker";
import rateLimit from "express-rate-limit";

const { APPLICATION_NX_PORT } = process.env;

(async () => {
  // First we make sure we can connect to the database
  await createConnection({
    url: process.env.DB,
    type: "postgres",
    synchronize: true,
    entities: [Url],
  });

  // Then we can create our express web server
  const app = express();

  // Cors
  app.use(
    cors({
      origin: process.env.AUTH0_BASE_URL,
    })
  );

  if (process.env.NODE_ENV !== "development") {
    app.use(
      rateLimit({
        max: 50,
        windowMs: parseInt(process.env.RATELIMIT_TIMESPAN_IN_MINUTES) * 60000,
        message: "Rate Limit reached",
      })
    );
  }

  // GraphQL
  const schema = await buildSchema({
    resolvers: [UrlResolver],
    container: iocContainer,
    authChecker: authChecker,
  });

  const server = new ApolloServer({
    schema,
    // TODO: Check if this is needed
    context: ({ req }) => {
      const token = req.headers.authorization;
      if (!token) return;

      return { token };
    },
  });

  server.applyMiddleware({ app });

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
    console.log(`🚀 Service is listening on ${server.graphqlPath} [Port: ${APPLICATION_NX_PORT || 4000}]`)
  );
})();
