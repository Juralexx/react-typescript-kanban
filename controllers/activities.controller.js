import ActivityModel from '../models/activity.model.js'
import mongoose from 'mongoose'
const ObjectID = mongoose.Types.ObjectId

export const getActivities = (req, res) => {
    ActivityModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

/**
 * Add new activity document
 * @param {*} activity Activity feed
 */

export const addActivity = async (req, res) => {

    await ActivityModel.create({ _id: (new ObjectID).toString(), ...req.body.activity })
        .then(docs => {
            res.send(docs)
        })
        .catch(err => {
            res.status(400).send({ message: err })
        })
}