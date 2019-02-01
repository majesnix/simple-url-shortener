import { Request } from "express";
import { BaseLogger } from "pino";

interface exReq extends Request {
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
	users?: IUsers[] | null,
	links?: ILinks[] | null,
	url?: string | null,
	shortURL?: string | null,
	ratelimit?: boolean,
	errResponse?: string | null
}