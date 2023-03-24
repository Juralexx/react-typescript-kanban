import React from 'react'
import axios from 'axios'
import { SocketContext } from './SocketContext'
import { UserProps } from 'types/types';

interface Props {
    children: React.ReactNode | string | JSX.Element | JSX.Element[];
}

interface OnlineProps {
    online: Array<UserProps>,
    offline: Array<UserProps>,
}

const defaultOnlineProps = {
    online: [],
    offline: [],
}

interface UsersContextProps {
    allUsers: Array<UserProps>,
    setAllUsers: React.Dispatch<React.SetStateAction<Array<UserProps>>>,
    onlineUsers: OnlineProps,
    setOnlineUsers: React.Dispatch<React.SetStateAction<OnlineProps>>
}

const defaultUsersContextProps = {
    allUsers: [],
    setAllUsers: () => { },
    onlineUsers: defaultOnlineProps,
    setOnlineUsers: () => { }
}

export const UsersContext = React.createContext<UsersContextProps>(defaultUsersContextProps)

const UsersContextProvider = ({ children }: Props) => {
    const [allUsers, setAllUsers] = React.useState<Array<UserProps>>([])
    const [onlineUsers, setOnlineUsers] = React.useState<OnlineProps>(defaultOnlineProps)

    const { websocket } = React.useContext(SocketContext)

    React.useEffect(() => {
        const fetchUsers = async () => {
            await axios
                .get(`${process.env.REACT_APP_SERVER_URL}api/user`)
                .then(res => setAllUsers(res.data))
                .catch(err => console.error(err))
        }
        fetchUsers()
    }, [])

    React.useEffect(() => {
        if (websocket) {
            let online: any[] = []
            let offline: any[] = []
            websocket.on("getUsers", (users: any[]) => {
                allUsers.forEach((user: any) => {
                    users.some(u => u._id === user._id) ? online = [...online, user] : offline = [...offline, user]
                })
                setOnlineUsers({ online: online, offline: offline })
            })
            return () => {
                websocket.off("getUsers")
            }
        }
    }, [websocket, allUsers])

    return (
        <UsersContext.Provider value={{ allUsers, setAllUsers, onlineUsers, setOnlineUsers }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider