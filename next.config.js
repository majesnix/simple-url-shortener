module.exports = {
	webpack: config => {
		config.module.rules.push({
			test: /\.scss$/,
			use: [
				{
					loader: 'emit-file-loader',
					options: {
						name: 'dist/[path][name].[ext]',
					},
				},
				'babel-loader',
				'styled-jsx-css-loader',
			],
		});

		return config;
	},
};

// next.config.js
const withESLint = require('next-eslint');
module.exports = withESLint();

// make process.env usable in next.js / clientReact / webpack
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
	webpack(config) {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

		return config;
	},
};
