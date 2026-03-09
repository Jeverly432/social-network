const Router = require('express');
const router = new Router();
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const uploadMultipleMiddleware = require('../middleware/uploadMultipleMiddleware');

router.post('/avatar', authMiddleware, uploadMiddleware, uploadController.uploadUserAvatar);

router.post('/community/:communityId/avatar', authMiddleware, uploadMiddleware, uploadController.uploadCommunityAvatar);

router.post('/community/:communityId/cover', authMiddleware, uploadMiddleware, uploadController.uploadCommunityCover);

router.post('/posts', authMiddleware, uploadMultipleMiddleware, uploadController.uploadPostImages);

router.post('/', authMiddleware, uploadMiddleware, uploadController.uploadImage);

module.exports = router;
