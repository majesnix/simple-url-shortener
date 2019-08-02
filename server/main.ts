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

import { User } from "./models";
import bcrypt from "bcrypt";

const createInitalUser = async () => {
	if (process.env.INIT! === "true") {
		try {
			const Users = database.get("majesurl").getRepository(User);

			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASS!, salt);

			const user = new User();
			user.email = "majesnix@majesnix.org";
			user.password = hashedPassword;
			user.username = process.env.ADMIN_USER!;
			user.active = true;

			await Users.save(user);
			console.log("CREATED INITAL USER");
		} catch (error) {
			console.log("ERROR creating inital user", error);
		}
	}
};

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

	createInitalUser();

	server.listen(port, (err: Error) => {
		if (err) throw err;
		console.log(`> Ready on http://${process.env.BASE_URL}:${port}`);
	});
})();
