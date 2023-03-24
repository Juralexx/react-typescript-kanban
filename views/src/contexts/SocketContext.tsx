import useSocket from 'functions/hooks/useSocket';
import React from 'react'
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface ContextProps {
    children: React.ReactNode | string | JSX.Element | JSX.Element[];
}

interface SocketProps {
    websocket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

const defaultSocketProps: SocketProps = {
    websocket: null
}

export const SocketContext = React.createContext<SocketProps>(defaultSocketProps)

const SocketContextProvider = ({ children }: ContextProps) => {
    // const socket = React.useRef(io(`${process.env.REACT_APP_SERVER_URL}`)) // as React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>

    const [websocket] = useSocket(process.env.REACT_APP_SERVER_URL, {
        autoConnect: false,
    })

    return (
        <SocketContext.Provider value={{ websocket: websocket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider