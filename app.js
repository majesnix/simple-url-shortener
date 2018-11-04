const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const addLogger = require('./src/middleware/addLogger');

const urlRoutes = require('./src/routes/url');

app.use(morgan('dev'));
// enhance your app security with Helmet
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// enable all CORS requests
app.use(cors());

app.use(addLogger);

// Routes which should handle requests
app.use('/', urlRoutes);
app.use('/v1/', urlRoutes);


app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
