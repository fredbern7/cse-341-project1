const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger-tags-['Contacts']
    const result = await mongodb.getDatabase().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //#swagger-tags-['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createContact = async (req, res) => {
    //#swagger-tags-['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error occureds while adding the contacts");
    }
};

const updateContact = async (req, res) => {
    //#swagger-tags-['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error occureds while updating the contacts");
    }

};

// const deleteContact = async (req, res) => {
//     //#swagger-tags-['Contacts']
//     const contactId = new ObjectId(req.params.id);
//     const response = await mongodb.getDatabase().collection("contacts").deleteOne({ _id: contactId });
//     if (response.deleteContact > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || "Error occureds while deleting the contacts");
//     }
// }
const deleteContact = async (req, res) => {
    // #swagger-tags-['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        console.log(`Attempting to delete contact with ID: ${contactId}`);

        const response = await mongodb.getDatabase().collection("contacts").deleteOne({ _id: contactId });

        console.log(`MongoDB delete response: ${JSON.stringify(response)}`);

        if (response.deletedCount > 0) {
            console.log('Contact successfully deleted.');
            res.status(204).send(); // No Content
        } else {
            console.log('Contact not found.');
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (error) {
        console.error('Error occurred while deleting the contact:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
