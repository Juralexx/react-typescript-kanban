import TaskModel from '../models/task.model.js'
import mongoose from 'mongoose'
import UserModel from '../models/user.model.js'
const ObjectID = mongoose.Types.ObjectId

export const getTasks = (req, res) => {
    TaskModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

/**
 * Get task by ID
 * @param {*} id Task ID
 */

export const findTaskById = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Unknown ID : ' + req.params.id)
    }
    TaskModel.findById({ _id: req.params.id },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
}

/**
 * Create a task
 * @param {*} task Task object
 * @param {*} activity Activity feed
 */

export const createTask = async (req, res) => {
    const task = Object.assign(req.body.task, { _id: (new ObjectID).toString() })

    await TaskModel.create({ ...task })
        .then(async docs => {
            await UserModel.findByIdAndUpdate(
                { _id: req.body.userId },
                {
                    $addToSet: {
                        tasks: task._id,
                    }
                },
                { new: true }
            )
            return docs
        })
        .then(docs => {
            res.send(docs)
        })
        .catch(err => {
            res.status(400).send({ message: err })
        })
}

/**
 * Update a task
 * @param {*} id Task ID
 * @param {*} task Task object
 */

export const updateTask = async (req, res) => {
    try {
        await TaskModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.task.title,
                    description: req.body.task.description,
                    state: req.body.task.state,
                    status: req.body.task.status,
                    end: req.body.task.end,
                    members: req.body.task.members,
                    color: req.body.task.color
                }
            },
            { new: true }
        )
            .then(docs => {
                res.send(docs)
            })
            .catch(err => {
                return res.status(400).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Delete a task
 * @param {*} id Task ID
 */

export const deleteTask = async (req, res) => {
    try {
        await TaskModel.findByIdAndDelete({ _id: req.params.id })
            .then(async docs => {
                await UserModel.findByIdAndUpdate(
                    { _id: req.body.userId },
                    {
                        $pull: {
                            tasks: req.params.id,
                        }
                    },
                    { new: true }
                )
                return docs
            })
            .then(docs => {
                res.send(docs)
            })
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Comment a task
 * @param {*} id Task ID
 * @param {*} comment Comment object
 */

export const commentTask = async (req, res) => {
    try {
        await TaskModel.updateOne(
            { _id: req.params.id },
            {
                $addToSet: {
                    comments: req.body.comment,
                }
            },
            { new: true }
        )
            .then(docs => {
                res.send(docs)
            })
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}