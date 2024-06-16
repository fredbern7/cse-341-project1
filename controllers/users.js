const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('users').findOne({ _id: userId });
    result.then((user) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    });
};

module.exports = {
    getAll,
    getSingle
};
