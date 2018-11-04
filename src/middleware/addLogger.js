const pino = require('pino')({ prettyPrint: { colorize: true } });

module.exports = async (req, res, next) => {
	req.log = pino;
	next();
};
