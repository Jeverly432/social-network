const Router = require('express');

const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

router.post('/create', authMiddleware, postController.createPost);
router.get('/get/:id', authMiddleware, postController.getPost);

module.exports = router;
