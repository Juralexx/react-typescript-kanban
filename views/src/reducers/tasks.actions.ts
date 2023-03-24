import axios from "axios";
import { Dispatch } from "redux";
import { TaskProps, UserProps } from "types/types";

/**
 * Get tasks
 */

export const GET_TASKS = "GET_TASKS"

export const getTasks = () => {
    return async (dispatch: Dispatch) => {
        await axios
            .get(`${process.env.REACT_APP_SERVER_URL}api/tasks/`)
            .then(res => {
                dispatch({ type: GET_TASKS, payload: res.data })
            })
            .catch(err => console.log(err))
    }
}

export const CREATE_TASK = "CREATE_TASK"

/**
 * Create a new task
 * @param {*} task Task object
 */

export const createTask = (task: TaskProps, activity: any) => {
    return async (dispatch: Dispatch) => {
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}api/tasks/add`,
            data: {
                task: task,
                userId: task.poster!._id
            }
        })
            .then(res => {
                dispatch({ type: CREATE_TASK, payload: { task: res.data, activity: activity } })
            })
            .then(async () => {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}api/activities/add/`,
                    data: {
                        activity: activity
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export const receiveCreateTask = (task: TaskProps, activity: any) => {
    return async (dispatch: Dispatch) => {
        return dispatch({ type: CREATE_TASK, payload: { task, activity } })
    }
}

export const UPDATE_TASK = "UPDATE_TASK"

/**
 * Update task
 * @param {*} task Task object
 */

export const updateTask = (task: TaskProps, activity: any) => {
    return async (dispatch: Dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_SERVER_URL}api/tasks/${task._id}/update/`,
            data: {
                task: task
            }
        })
            .then(() => {
                dispatch({ type: UPDATE_TASK, payload: { task: task, activity: activity } })
            })
            .then(async () => {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}api/activities/add/`,
                    data: {
                        activity: activity
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export const receiveUpdateTask = (task: TaskProps, activity: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_TASK, payload: { task, activity } })
    }
}

export const DELETE_TASK = "DELETE_TASK"

/**
 * Update task
 * @param {*} task Task object
 */

export const deleteTask = (task: TaskProps, activity: any) => {
    return async (dispatch: Dispatch) => {
        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_SERVER_URL}api/tasks/${task._id}/delete/`,
            data: {
                userId: task.poster!._id
            }
        })
            .then(() => {
                dispatch({ type: DELETE_TASK, payload: { taskId: task._id, activity: activity } })
            })
            .then(async () => {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}api/activities/add/`,
                    data: {
                        activity: activity
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export const receiveDeleteTask = (taskId: string, activity: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: DELETE_TASK, payload: { taskId, activity } })
    }
}

export const COMMENT_TASK = "COMMENT_TASK"

/**
 * Comment task
 * @param {*} task Task object
 * @param {*} comment Comment object
 */

export const commentTask = (task: TaskProps, comment: any, activity: any) => {
    return async (dispatch: Dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_SERVER_URL}api/tasks/${task._id}/comment/`,
            data: {
                comment: comment
            }
        })
            .then(() => {
                dispatch({ type: COMMENT_TASK, payload: { taskId: task._id, comment: comment, activity: activity } })
            })
            .then(async () => {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}api/activities/add/`,
                    data: {
                        activity: activity
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export const receiveCommentTask = (task: TaskProps, comment: any, activity: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: COMMENT_TASK, payload: { task, comment, activity } })
    }
}

/**
 * Update task
 * @param {*} task Task object
 */

export const updateTaskColor = (task: TaskProps, color: string) => {
    return async (dispatch: Dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_SERVER_URL}api/tasks/${task._id}/update/`,
            data: {
                task: { ...task, color: color }
            }
        })
            .then(() => {
                dispatch({ type: UPDATE_TASK, payload: { task: { ...task, color: color } } })
            })
            .catch(err => console.log(err))
    }
}

export const receiveUpdateTaskColor = (task: TaskProps, color: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_TASK, payload: { task: { ...task, color: color } } })
    }
}

/**
 * Get activities
 */

export const GET_ACTIVITIES = "GET_ACTIVITIES"

export const getActivities = () => {
    return async (dispatch: Dispatch) => {
        await axios
            .get(`${process.env.REACT_APP_SERVER_URL}api/activities/`)
            .then(res => {
                dispatch({ type: GET_ACTIVITIES, payload: res.data })
            })
            .catch(err => console.log(err))
    }
}