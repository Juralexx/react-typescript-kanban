import axios from "axios";
import { Dispatch } from "redux";

/**
 * Get user
 */

export const GET_USER = "GET_USER"

/**
 * Get user profil
 * @param {*} uid User ID
 */

export const getUser = (uid: string) => {
    return async (dispatch: Dispatch) => {
        await axios
            .get(`${process.env.REACT_APP_SERVER_URL}api/user/${uid}`)
            .then(res => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch(err => console.log(err))
    }
}

export const UPDATE_USER = "UPDATE_USER"

/**
 * Update user informations
 * @param {*} uid New user ID
 * @param {*} taskId New task ID
 */

export const updateUser = (uid: string, taskId: string) => {
    return async (dispatch: Dispatch) => {
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_SERVER_URL}api/user/${uid}`,
            data: {
                taskId: taskId
            }
        })
            .then(() => {
                dispatch({ type: UPDATE_USER, payload: { taskId } })
            })
            .catch(err => console.log(err))
    }
}