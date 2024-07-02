const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', isAdmin, getUsers);
router.post('/', isAdmin, createUser);
router.put('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
