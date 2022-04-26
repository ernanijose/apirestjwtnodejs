const { route } = require('express/lib/application');
const { createUser, 
    getUserByUserId, 
    getUsers, 
    updateUser, 
    deleteUser,
    login } = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserByUserId);
router.patch('/', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', login);

module.exports = router;