import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

/**
 * Get all the created users profils
 * @param {*} req Request 
 * @param {*} res Response
 */

export const getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

/**
 * Get user profil by ID
 * @param {*} id User ID to get
 */

export const getUserByID = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Unknown ID : ' + err)
        }
    }).select('-password')
};

/**
 * Update user profil
 */

export const updateUser = async (req, res) => {
    const { task, picture } = req.body

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    await UserModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                picture: picture,
            },
            $addToSet: {
                tasks: task
            }
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true
        },
    )
        .then(docs => {
            return res.send(docs)
        })
        .catch(err => {
            return res.status(500).send({ message: err })
        })
};

/**
 * Delete user profil
 * @param {*} id ID of the user to delete
 */

export const deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }

    try {
        await UserModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Successfully deleted." })
    } catch {
        return res.status(500).json({ message: err })
    }
}