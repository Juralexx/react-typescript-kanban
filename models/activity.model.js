import mongoose from 'mongoose'

const ActivityModel = new mongoose.Schema(
    {
        type: {
            type: String
        },
        date: {
            type: Date
        },
        who: {
            type: String
        },
        task: {
            type: String
        },
        prev_state: {
            type: String
        },
        new_state: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("activities", ActivityModel)