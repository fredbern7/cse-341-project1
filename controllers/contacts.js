const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: userId });
    result.then((user) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

module.exports = {
    getAll,
    getSingle
};
