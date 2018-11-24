const express = require('express');
const router = express.Router();

const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message:
		'Too many requests, please try again after an hour',
});

const {
	create_user,
	get_user,
	getAll_user,
	delete_user,
	update_user,
	login_user,
} = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

router.get('/:id', checkAuth, get_user);
router.get('/', checkAuth, getAll_user);
router.post('/create', checkAuth, create_user);
router.put('/:id', checkAuth, update_user);
router.delete('/:id', checkAuth, delete_user);

router.post('/login', loginLimiter, login_user);

module.exports = router;
