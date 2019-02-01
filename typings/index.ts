import { Request } from "express";
import { BaseLogger } from "pino";

export interface exReq extends Request {
	log: BaseLogger;
}

export type IUsers = {
	id: string,
	username: string,
	email: string
}

export type ILinks = {
	id: number,
	shortUrl: string,
	longUrl: string
}

export type IState = {
	err?: boolean,
	users?: IUsers[],
	links?: ILinks[],
	url?: string,
	shortURL?: string,
	ratelimit?: boolean,
	errResponse?: string | null
}