require('dotenv').config();

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const addLogger = require('./src/middleware/addLogger');

const urlRoutes = require('./src/routes/url');
const userRoutes = require('./src/routes/user');

const port = process.env.PORT || 3000;

app.prepare()
	.then(() => {
		const server = express();

		// enhance your app security with Helmet
		server.use(helmet());

		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(bodyParser.json());
		// enable all CORS requests
		server.use(cors());

		server.use(addLogger);

		// Routes which should handle requests
		server.use('/api/users/', userRoutes);
		server.use('/api/v1/users/', userRoutes);
		server.use('/api/', urlRoutes);
		server.use('/api/v1/', urlRoutes);

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.use((req, res, next) => {
			const error = new Error('Not found');
			error.status = 404;
			next(error);
		});

		server.use((error, req, res) => {
			res.status(error.status || 500);
			res.json({ error: { message: error.message } });
		});

		server.listen(port);

	})
	.catch(ex => {
		console.error(ex.stack); //eslint-disable-line
		process.exit(1);
	});

console.log(`Listening on ${port}`); // eslint-disable-line
