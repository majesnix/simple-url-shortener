const express = require('express');
const router = express.Router();

const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
	windoMs: 15 * 60 * 1000,
	max: 15,
});

const {
	create_url,
	get_url,
	getAll_url,
	delete_url
} = require('../controllers/urlsController');
const checkAuth = require('../middleware/check-auth');

router.post('/', apiLimiter, create_url);
router.delete('/:id', checkAuth, delete_url);
router.get('/getAll', checkAuth, getAll_url);
router.get('/:short_url', get_url);
router.get('/', apiLimiter, create_url);

module.exports = router;
