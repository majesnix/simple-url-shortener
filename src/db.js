const connection = require('./sequelize');

const UrlsMeta = require('./models/Urls');

module.exports.Urls = connection.define('urls', UrlsMeta.attributes, UrlsMeta.options);
