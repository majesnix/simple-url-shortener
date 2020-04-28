/**
 * create_url
 * delete_url
 * get_url
 * getAll_url
 */
import * as shortid from "shortid";
import { Url } from "../models";
import database from "../structures/database";

import { Response } from "express";

const getRepo = () => {
	return database.get("majesurl").getRepository(Url);
};

export const createUrl = async (req: any, res: Response) => {
	const { url: urlFromBody } = req.body;
	const { url: urlFromQuery } = req.query;

	const urlInput: string = urlFromBody ? urlFromBody : urlFromQuery;

	// Create and save shortlink to database
	// tslint:disable-next-line:max-line-length
	const expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	const regex = new RegExp(expression);

	try {
		if (urlInput.match(regex)) {
			const id = shortid.generate();

			const Urls = getRepo();

			const url = new Url();
			url.longUrl = urlInput;
			url.shortUrl = id;
			await Urls.save(url);

			return res.status(200).json({
				base: url,
				short:
					process.env.NODE_ENV !== "production"
						? `http://${process.env.BASE_URL}:${process.env.PORT}/${id}`
						: `https://${process.env.BASE_URL}/${id}`,
			});
		} else {
			return res.status(400).end();
		}
	} catch (err) {
		req.log.error(err);

		return res.status(500).json({
			error: err,
		});
	}
};

export const deleteUrl = async (req: any, res: Response) => {
	const Urls = getRepo();
	const { id } = req.params;
	console.log("ID TO DELETE", id);

	try {
		await Urls.delete(id);

		const urls = await Urls.find();

		console.log("DELETED", urls);
		return res.status(200).json({
			urls,
		});
	} catch (error) {
		req.log.error(error);
		const urls = await Urls.find();

		return res.status(200).json({ urls });
	}
};

export const getUrl = async (req: any, res: Response) => {
	const { shortUrl } = req.params;

	try {
		const Urls = getRepo();
		const urlObj = await Urls.findOne({ where: { shortUrl } });
		if (urlObj) {
			return res.status(200).json({
				url: urlObj.longUrl,
			});
		} else {
			return res.status(404).end();
		}
	} catch (err) {
		req.log.error(err);

		return res.status(404).end();
	}
};

export const getAllUrl = async (_req: any, res: Response) => {
	try {
		const Urls = getRepo();
		const urls = await Urls.find();

		return res.status(200).json({
			urls,
		});
	} catch (err) {
		return res.status(500).end();
	}
};
