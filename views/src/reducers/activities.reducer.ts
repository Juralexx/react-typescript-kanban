import { COMMENT_TASK, CREATE_TASK, DELETE_TASK, GET_ACTIVITIES, UPDATE_TASK } from "./tasks.actions";

interface activitiesState extends Array<any> { }

const initialState: activitiesState = []

export default function activitiesReducer(state = initialState, action: any) {

    switch (action.type) {
        case GET_ACTIVITIES:
            return action.payload

        case (CREATE_TASK || UPDATE_TASK || DELETE_TASK || COMMENT_TASK):
            return [action.payload.activity, ...state]

        default:
            return state;
    }
}