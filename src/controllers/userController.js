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
const { Users } = require('../db');
//const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

exports.create_user = async (req, res) => {
	const { email, username, password, password2 } = req.body;

	let hashedPassword;
	if (password === password2) {
		const salt = bcrypt.genSaltSync(10);
		hashedPassword = bcrypt.hashSync(password, salt);
	} else {
		return res.status(400).end();
	}
	// create the user in the database
	try {
		await Users.create({
			email,
			username,
			password: hashedPassword,
		});

		return res.status(201).end();
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({
			error: err,
		});
	}
};

exports.get_user = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await Users.findOne({ where: { id } });
		delete user.dataValues.password;
		return res.status(200).json({ user });
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

exports.getAll_user = async (req, res) => {
	try {
		const users = await Users.findAll({
			attributes: { exclude: ['password', 'updatedAt'] },
		});
		return res.status(200).json({ users });
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

exports.update_user = async (req, res) => {
	const { id } = req.params;
	const { password, email } = req.body;

	try {
		const user = await Users.findOne({ where: { id } });

		// update user object with new data
		if (password) {
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);

			user.password = hashedPassword;
		}
		if (email) user.email = email;
		await user.save();

		return res.status(200).json({ message: 'Sucessfully updated' });
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({ message: 'Something went wrong' });
	}
};

exports.delete_user = async (req, res) => {
	const { id } = req.body;

	try {
		const user = await Users.findOne({ where: { id } });
		await user.destroy();
		return res.status(200).json({
			message: 'User deleted',
		});
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({ error: err });
	}
};

exports.login_user = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		let user;
		if (username) {
			user = await Users.findOne({ where: { username } });
		} else if (email) {
			user = await Users.findOne({ where: { email } });
		}
		if (user) {
			const match = await bcrypt.compare(password, user.password);

			if (match) {
				if (!user.active)
					return res
						.status(403)
						.json({ message: 'User is inactive' });

				const token = jwt.sign(
					{
						id: user.id,
					},
					JWT_KEY,
					{
						expiresIn: '24h',
					}
				);

				return res.status(200).json({
					message: 'Authentication successful',
					token,
				});
			} else {
				req.log.error('WRON PASSWORD');
				return res.status(403).json({ message: 'Wrong password' });
			}
		}

		req.log.error('USER DOES NOT EXIST');
		return res.status(403).json({ message: 'User does not exist' });
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({
			message: 'Something went wrong, contact an Administrator',
		});
	}
};
