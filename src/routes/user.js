const express = require('express');
const router = express.Router();

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

router.post('/login', login_user);

module.exports = router;
