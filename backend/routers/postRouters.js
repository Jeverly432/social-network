const Router = require('express');

const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

router.post('/create', authMiddleware, postController.createPost);
router.get('/get/:id', authMiddleware, postController.getPost);
router.get('/all', authMiddleware, postController.getPosts);
router.get('/user/:userName', authMiddleware, postController.getUserPosts);
router.delete('/delete/:id', authMiddleware, postController.deletePost);
router.put('/update/:id', authMiddleware, postController.updatePost)

module.exports = router;
