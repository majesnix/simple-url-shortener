const express = require('express');
const router = express.Router();

const {
	create_url,
	get_url,
	getAll_url,
	delete_url
} = require('../controllers/urlsController');
const checkAuth = require('../middleware/check-auth');

router.post('/', create_url);
router.delete('/:id', checkAuth, delete_url);
router.get('/:short_url', get_url);
router.get('/urls', checkAuth, getAll_url);
router.get('/', create_url);

module.exports = router;
