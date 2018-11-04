/**
 * get_url
 * create_url
 */
const { Urls } = require('../db');
const { isUri } = require('valid-url');
const shortid = require('shortid');


exports.create_url = async (req, res) => {
	const { url } = req.body;

	// create the user in the database
	try {

		const id = shortid.generate();
		if (isUri(url)) {
			await Urls.create({
				short_url: id,
				long_url: url,
			});
	
			return res.status(201).json({
				base: url,
				short: id
			});
		}
	} catch (err) {
		req.log.error(err);
		return res.status(500).json({
			error: err,
		});
	}
};
