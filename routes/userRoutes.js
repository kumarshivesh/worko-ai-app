const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/user', authMiddleware, userController.listUsers);
router.get('/user/:userId', authMiddleware, userController.getUser);
router.post('/user', authMiddleware, userController.createUser);
router.put('/user/:userId', authMiddleware, userController.updateUser);
router.patch('/user/:userId', authMiddleware, userController.patchUser);
router.delete('/user/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
