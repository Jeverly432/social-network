const Router = require('express');

const router = new Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:userName', authMiddleware, followController.followUser);
router.delete('/:userName', authMiddleware, followController.unfollowUser);
router.get('/:userName/followers', authMiddleware, followController.getFollowers);
router.get('/:userName/following', authMiddleware, followController.getFollowing);

module.exports = router;
