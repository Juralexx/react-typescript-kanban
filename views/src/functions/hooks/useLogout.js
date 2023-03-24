import React from 'react'
import axios from 'axios'
import { SocketContext, UsersContext } from 'contexts'

const useLogout = (user) => {
    const { websocket } = React.useContext(SocketContext)
    const { onlineUsers } = React.useContext(UsersContext)

    const logout = async () => {
        onlineUsers.online.forEach(u => {
            websocket.emit("logout", {
                receiverId: u._id,
                userId: user._id,
            })
        })
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => {
                localStorage.removeItem("auth")
            })
            .catch(err => console.log(err))
        window.location.pathname = '/'
    }

    return { logout }
}

export default useLogout