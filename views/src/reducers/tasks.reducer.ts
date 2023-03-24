import { TaskProps } from "types/types";
import { COMMENT_TASK, CREATE_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from "./tasks.actions";

interface tasksState extends Array<TaskProps> { }

const initialState: tasksState = []

export default function tasksReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_TASKS:
            return action.payload

        case CREATE_TASK:
            return [...state, action.payload.task]

        case UPDATE_TASK:
            let i = state.findIndex(task => task._id === action.payload.task._id)
            state[i] = action.payload.task
            return [...state]

        case DELETE_TASK:
            return [...state.filter(e => e._id !== action.payload.taskId)]

        case COMMENT_TASK:
            let k = state.findIndex(task => task._id === action.payload.taskId)
            state[k].comments = [...state[k].comments!, action.payload.comment]
            return [...state]

        default:
            return state;
    }
}