/**
 * get_url
 * create_url
 */
const { Urls } = require('../db');
const { isUri } = require('valid-url');
const shortid = require('shortid');

exports.create_url = async (req, res) => {
	const { url: urlFromBody } = req.body;
	const { url: urlFromQuery } = req.query;

	let url = urlFromBody ? urlFromBody : urlFromQuery;
	console.log(url);

	// create and save shortlink to database
	try {
		if (isUri(url)) {
			const id = shortid.generate();
			await Urls.create({
				short_url: id,
				long_url: url,
			});

			return res.status(200).json({
				base: url,
				short: process.env.NODE_ENV !== 'production' ? `http://${process.env.BASE_URL}:${process.env.PORT}/${id}` : `https://${process.env.BASE_URL}/${id}`,
			});
		} else {
			return res.status(400);
		}
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({
			error: err,
		});
	}
};

exports.delete_url = async (req, res) => {
	const { id } = req.params;

	try {
		const url = await Urls.findOne({ where: { id } });
		url.destroy();
		const urls = await Urls.findAll();

		return res.status(200).json({
			urls,
		});
	} catch (error) {
		return res.status(500);
	}
};

exports.get_url = async (req, res) => {
	const { short_url } = req.params;

	try {
		const urlObj = await Urls.findOne({ where: { short_url } });
		if (urlObj) {
			return res.status(200).json({
				url: urlObj.long_url,
			});
		}
	} catch (err) {
		req.log.error(err);
		return res.status(404);
	}
};

exports.getAll_url = async (req, res) => {
	try {
		const urls = await Urls.findAll();
		return res.status(200).json({
			urls,
		});
	} catch (err) {
		return res.status(500);
	}
};
