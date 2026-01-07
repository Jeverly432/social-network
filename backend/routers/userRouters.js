const Router = require('express');

const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, userController.getCurrentUser);
router.put('/me', authMiddleware, userController.updateCurrentUser);
router.delete('/me', authMiddleware, userController.deleteCurrentUser);
router.get('/:userName', authMiddleware, userController.getUser)

module.exports = router;
