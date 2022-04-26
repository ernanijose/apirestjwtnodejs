const { route } = require('express/lib/application');
const { createUser, 
    getUserByUserId, 
    getUsers, 
    updateUser, 
    deleteUser } = require('./user.controller');

const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByUserId);
router.patch('/', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;