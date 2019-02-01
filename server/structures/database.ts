import { ConnectionManager } from "typeorm";
import { Url, User } from "../models";

const connectionManager = new ConnectionManager();
connectionManager.create({
	name: "majesurl",
	type: "postgres",
	url: process.env.DB,
	entities: [Url, User],
	synchronize: true,
});

export default connectionManager;
