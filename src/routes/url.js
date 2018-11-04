const express = require('express');
const router = express.Router();

const {
	create_url,
	get_url,
} = require('../controllers/urlsController');

router.post('/', create_url);
router.get('/:shortUrl', get_url);

module.exports = router;
