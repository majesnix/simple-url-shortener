/**
 * CRUD
 * create_user
 * get_user
 * getAll_user
 * update_user
 * delete_user
 *
 * Authentication Routes
 * login_user
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import database from "../structures/database";

import { Response } from "express";

const { JWT_KEY } = process.env;

const getRepo = () => {
	return database.get("majesurl").getRepository(User);
};

export const createUser = async (req: any, res: Response) => {
	const { email, username, password, password2 } = req.body;

	let hashedPassword: string;
	if (password === password2) {
		const salt = bcrypt.genSaltSync(10);
		hashedPassword = bcrypt.hashSync(password, salt);
	} else {
		return res.status(400).end();
	}
	// Create the user in the database
	try {
		const user = new User();
		user.email = email;
		user.password = hashedPassword;
		user.username = username;

		const Users = getRepo();
		await Users.save(user);

		return res.status(201).end();
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({
			error: err,
		});
	}
};

export const getUser = async (req: any, res: Response) => {
	const { id } = req.params;
	try {
		const Users = getRepo();
		const user = await Users.findOne({ where: { id } });
		if (user) delete user.password;

		return res.status(200).json({ user });
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const getAllUser = async (req: any, res: Response) => {
	try {
		const Users = getRepo();
		const users = await Users.find({
			select: ["email", "username", "active"],
		});

		return res.status(200).json({ users });
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const updateUser = async (req: any, res: Response) => {
	const { id } = req.params;
	const { password, email } = req.body;

	try {
		const Users = getRepo();
		const user = await Users.findOne({ where: { id } });

		// Update user object with new data
		if (user) {
			if (password) {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				user.password = hashedPassword;
			}
			if (email) user.email = email;
			await Users.save(user);
		}

		return res.status(200).json({ message: "Sucessfully updated" });
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const deleteUser = async (req: any, res: Response) => {
	const { id } = req.body;

	try {
		const Users = getRepo();
		await Users.delete(id);

		return res.status(200).json({
			message: "User deleted",
		});
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({ error: err });
	}
};

export const loginUser = async (req: any, res: Response) => {
	const { username, email, password } = req.body;

	try {
		const Users = getRepo();

		let user: User | undefined;
		if (username) {
			user = await Users.findOne({ where: { username } });
		} else if (email) {
			user = await Users.findOne({ where: { email } });
		}
		if (user) {
			const match = await bcrypt.compare(password, user.password);

			if (match) {
				if (!user.active) {
					return res.status(403).json({ message: "User is inactive" });
				}

				const token = jwt.sign(
					{
						id: user.id,
					},
					JWT_KEY!,
					{
						expiresIn: "24h",
					}
				);

				return res.status(200).json({
					message: "Authentication successful",
					token,
				});
			} else {
				req.log.error("WRON PASSWORD");

				return res.status(403).json({ message: "Wrong password" });
			}
		}

		req.log.error("USER DOES NOT EXIST");

		return res.status(403).json({ message: "User does not exist" });
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({
			message: "Something went wrong, contact an Administrator",
		});
	}
};

export const userIsAuthenticated = (req: any, res: Response) => {
	try {
		req.log.info("CHECKING USER AUTH");
		if (!req.headers.authorization) return res.status(401);
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, process.env.JWT_KEY!);
		req.log.info("TOKEN OK");

		return res.status(204);
	} catch (err) {
		req.log.error("BAD TOKEN");
		return res.status(401);
	}
};
