const Router = require('express');
const router = new Router();
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// POST /upload/avatar - загрузка аватара пользователя
router.post('/avatar', authMiddleware, uploadMiddleware, uploadController.uploadUserAvatar);

// POST /upload/community/:communityId/avatar - загрузка аватара сообщества
router.post('/community/:communityId/avatar', authMiddleware, uploadMiddleware, uploadController.uploadCommunityAvatar);

// POST /upload/community/:communityId/cover - загрузка обложки сообщества
router.post('/community/:communityId/cover', authMiddleware, uploadMiddleware, uploadController.uploadCommunityCover);

// POST /upload - универсальная загрузка (только возвращает URL)
router.post('/', authMiddleware, uploadMiddleware, uploadController.uploadImage);

module.exports = router;

