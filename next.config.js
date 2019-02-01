const withTypescript = require('@zeit/next-typescript')
// make process.env usable in next.js / clientReact / webpack
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

module.exports = withTypescript(
	withSass({
		webpack: config => {
			config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

			return config;
		},
	})
);