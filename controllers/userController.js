const { User, Thought } = require('../models');

const userController = {
    // getting all users
    getUsers(req, res) {
        User.find()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // getting single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((data) => {
                if (!data) {
                    return res.status(400).json({
                        message: 'Unable to find a user with this ID.'
                    });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // create a new user
    createUser( {body}, res) {
        User.create(body)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body)
            .then(
                res.json('This user has been updated')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // delete a user
    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.userId })
            .then(
                res.json('This user has been deleted')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // add a friend 
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, {
            $push: {
                friends: req.params.friendId
            }
        }, {
            new: true
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, {
            $pull: {
                friends: req.params.friendId
            }
        })
            .then(
                res.json('This freind was removed')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}

module.exports = userController;