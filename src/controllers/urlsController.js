/**
 * get_url
 * create_url
 */
const { Urls } = require('../db');
const { isUri } = require('valid-url');
const shortid = require('shortid');

exports.create_url = async (req, res) => {
	const { url } = req.body;

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
				short: id,
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
		return res.status(404).json({
			message: 'ID not found',
		});
	}
};
