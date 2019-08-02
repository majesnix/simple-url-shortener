require("reflect-metadata"); // tslint:disable-line
require("dotenv").config(); // tslint:disable-line

import next from "next";
// const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import database from "./structures/database";

const port = parseInt(process.env.PORT!, 10) || 3000;

// Routes
import urlRoutes from "./routes/urls";
import userRoutes from "./routes/users";

// Middleware
import addLogger from "./middleware/addLogger";

(async () => {
	await database.get("majesurl").connect();
	await app.prepare();

	const server = express();

	server.use(bodyParser.urlencoded({ extended: true }));
	server.use(bodyParser.json());
	server.use(cors());
	server.use(helmet());

	server.use(addLogger);

	server.use("/api/urls", urlRoutes);
	server.use("/api/users", userRoutes);
	server.use("/api/v1/urls", urlRoutes);
	server.use("/api/v1/users", userRoutes);

	server.get("*", async (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err: Error) => {
		if (err) throw err;
		console.log(`> Ready on http://${process.env.BASE_URL}:${port}`);
	});
})();
