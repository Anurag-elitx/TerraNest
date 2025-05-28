const express = require('express');
const router = express.Router();
const {
  getCommunities,
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  getUserCommunities,
  getCommunityPosts
} = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getCommunities);
router.get('/:id', getCommunity);

router.use(protect);

router.post('/', createCommunity);
router.put('/:id', updateCommunity);
router.delete('/:id', deleteCommunity);
router.post('/:id/join', joinCommunity);
router.post('/:id/leave', leaveCommunity);
router.get('/user/my-communities', getUserCommunities);
router.get('/:id/posts', getCommunityPosts);

module.exports = router;