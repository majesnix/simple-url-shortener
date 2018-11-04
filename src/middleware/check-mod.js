module.exports = async (req, res, next) => {
	try {
		const { scope } = req.user;
		if (scope === 'admin' || scope === 'moderator') {
			next();
		} else {
			throw ('O_o');
		}
	} catch (err) {
		req.log.error(err);
		return res.status(403).json({
			message: 'Authorization failed',
		});
	}
};
