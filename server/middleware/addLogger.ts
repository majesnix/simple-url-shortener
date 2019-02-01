import * as pino from "pino";
import { Response, NextFunction } from "express";
import { exReq } from "typings";
const logger = pino({ prettyPrint: { colorize: true } });

export default (req: exReq, _res: Response, next: NextFunction) => {
	req.log = logger;
	next();
};
