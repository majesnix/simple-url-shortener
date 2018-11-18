/**
 * get_url
 * create_url
 */
const { Urls } = require('../db');
const shortid = require('shortid');

exports.create_url = async (req, res) => {
	const { url: urlFromBody } = req.body;
	const { url: urlFromQuery } = req.query;

	let url = urlFromBody ? urlFromBody : urlFromQuery;

	// create and save shortlink to database
	const expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	const regex = new RegExp(expression);
	
	try {
		if (url.match(regex)) {
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
			return res.status(400).end();
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
		return res.status(500).end();
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
		return res.status(404).end();
	}
};

exports.getAll_url = async (req, res) => {
	try {
		const urls = await Urls.findAll();
		return res.status(200).json({
			urls,
		});
	} catch (err) {
		return res.status(500).end();
	}
};
