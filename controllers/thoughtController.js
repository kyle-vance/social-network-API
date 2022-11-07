const { Thought, Reaction } = require('../models');

const thoughtController = {
    //    get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // get one thought by id
    getOneThought(req, res) {
        Thought.findOne({
            _id: req.params.thoughtId
        })
            .populate('reactions')
            .then((data) => {
                if (!data) {
                    return res.status(400).json({
                        message: 'Unable to find a thought with this ID.'
                    });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // add a new thought
    createThought({ body }, res) {
        Thought.create(body)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
            .then(
                res.json('Updated your thought successfully.')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // delete a thought
    removeThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId })
            .then(
                res.json('Your thought was deleted.')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
            $push: { reactions: req.body }
        }, { new: true })
            .then(res.json('Reaction was successfully created!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
            $pull: {
                reactions: { reactionId: req.params.reactionId }
            }
        },
            {
                runValidators: true, new: true
            })
            .then(
                res.json('Your reaction was deleted.')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}

module.exports = thoughtController;