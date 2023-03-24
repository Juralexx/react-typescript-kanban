import mongoose from 'mongoose'

const TaskModel = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        state: {
            type: String
        },
        status: {
            type: String
        },
        end: {
            type: Date
        },
        date: {
            type: Date
        },
        color: {
            type: String
        },
        background: {
            type: String
        },
        poster: {
            type: Object,
            required: true,
            _id: {
                type: String,
                required: true
            },
            pseudo: {
                type: String,
                required: true
            },
            picture: {
                type: String,
                required: true
            },
        },
        members: {
            type: [],
            member: {
                _id: {
                    type: String,
                    required: true
                },
                pseudo: {
                    type: String,
                    required: true
                },
                picture: {
                    type: String,
                    required: true
                },
            }
        },
        comments: {
            type: [],
            comment: {
                _id: String,
                text: String,
                date: String,
                poster: {
                    type: Object,
                    required: true,
                    _id: {
                        type: String,
                        required: true
                    },
                    pseudo: {
                        type: String,
                        required: true
                    },
                    picture: {
                        type: String,
                        required: true
                    },
                },
            }
        }
    },
    {
        collection: "tasks",
        timestamps: true
    }
)

export default mongoose.model("tasks", TaskModel)