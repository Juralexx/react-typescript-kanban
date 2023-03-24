import { reduxDispatch } from "types/types";
import { GET_USER, UPDATE_USER } from "./user.actions";

interface userState {
    [key: string]: any
}

const initialState: userState = { }

export default function userReducer(state = initialState, action: reduxDispatch) {
    switch (action.type) {
        case GET_USER:
            return action.payload

        case UPDATE_USER:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.taskId],
            }

        default:
            return state;
    }
}