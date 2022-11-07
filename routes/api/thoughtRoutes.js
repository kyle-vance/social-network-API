const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought)
.put(updateThought)
.post(createThought)
.delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(removeReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;