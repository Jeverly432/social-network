const Router = require('express');

const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const communityController = require('../controllers/communityController');

router.post('/create', authMiddleware, communityController.createCommunity);
router.get('/my', authMiddleware, communityController.getMyCommunities);
router.get('/all', communityController.getAllCommunities);
router.post('/:id/join', authMiddleware, communityController.joinCommunity);
router.post('/:id/leave', authMiddleware, communityController.leaveCommunity);
router.get('/:id/members', authMiddleware, communityController.getCommunityMembers);
router.get('/:id/posts', authMiddleware, communityController.getPostsCommunities)
router.get('/:id', communityController.getCommunity);

module.exports = router;
