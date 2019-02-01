import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { exReq } from "typings";

export default (req: exReq, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, process.env.JWT_KEY);

		next();
	} catch (err) {
		// tslint:disable-next-line:no-console
		console.log(err);

		return res.status(401).json({
			message: "Authentication failed",
		});
	}
};
