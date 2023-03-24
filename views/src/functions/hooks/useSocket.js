import React from "react";
import io from "socket.io-client";

const useSocket = (...args) => {
    const { current: socket } = React.useRef(io(...args));

    React.useEffect(() => {
        return () => {
            socket && socket.removeAllListeners();
            socket && socket.close();
        };
    }, [socket]);

    return [socket];
};

export default useSocket;