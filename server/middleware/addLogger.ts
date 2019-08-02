import pino from "pino";
import { Response, NextFunction } from "express";
const logger = pino({ prettyPrint: { colorize: true } });

export default (req: any, _res: Response, next: NextFunction) => {
	req.log = logger;
	next();
};
