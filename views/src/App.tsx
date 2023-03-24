import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'reducers';
import { SocketContext, UsersContext } from 'contexts';
import Head from 'Head';
import Navbar from 'Navbar';
import Sidebar from 'Sidebar';
import Login from 'pages/Login'
import Register from 'pages/Register'
import Kanban from 'pages/Kanban'
import Activity from 'pages/Activity';
import Search from 'pages/Search';
import CreateTask from 'components/CreateTask';
import TaskModal from 'components/TaskModal';
import Icon from 'components/tools/icons/Icon';
import { TextButton } from 'components/tools/Button';
import { getUser } from 'reducers/user.actions';
import { isAuthenticated } from 'functions/Utils';
import { receiveCommentTask, receiveCreateTask, receiveDeleteTask, receiveUpdateTask } from 'reducers/tasks.actions';
import { UserProps } from 'types/types';

const App: React.FC = () => {
    const user = useAppSelector((state: any) => state.userReducer)
    const [uid, setUid] = React.useState<string | null>(null)
    const dispatch = useAppDispatch()

    const { websocket } = React.useContext(SocketContext)
    const { onlineUsers, setOnlineUsers } = React.useContext(UsersContext)

    React.useEffect(() => {
        const fetchToken = async () => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_SERVER_URL}jwtid`,
                withCredentials: true,
            })
                .then(res => {
                    if (res.data !== null) {
                        setUid(res.data)
                        dispatch(getUser(res.data))
                        websocket!.emit("addUser", { userId: res.data })
                    }
                })
                .catch(err => console.error(err))
        }
        fetchToken()
    }, [])

    /**
     * 
     */

    websocket!.connect();

    websocket!.on("logout", data => {
        let user: UserProps = onlineUsers.online.find(user => user._id !== data.userId)!
        let online: UserProps[] = onlineUsers.online.filter(user => user._id !== data.userId)
        let offline: UserProps[] = [user, ...onlineUsers.offline]
        setOnlineUsers({ online: online, offline: offline })
    })

    websocket!.on("createTask", data => {
        console.log('object');
        dispatch(receiveCreateTask(data.task, data.activity))
    })
    websocket!.on("updateTask", data => {
        dispatch(receiveUpdateTask(data.task, data.activity))
    })
    websocket!.on("commentTask", data => {
        dispatch(receiveCommentTask(data.task, data.comment, data.activity))
    })
    websocket!.on("deleteTask", data => {
        dispatch(receiveDeleteTask(data.taskId, data.activity))
    })

    /**
     * 
     */

    return (
        <RootContainer>
            <BrowserRouter>
                <Sidebar user={user} />
                <RootInner>
                    <Navbar user={user} uid={uid} />
                    <Routes>
                        <Route path="/*" element={
                            <RootInnerContainer>
                                <Head title="Kanban" />
                                <div className="kanban__header">
                                    <h1>Kanban Board</h1>
                                    <div className='kanban__header-inner'>
                                        <div className='kanban__header-buttons'>
                                            <TextButton className="btn_icon_start">
                                                <Link to={isAuthenticated(uid, 'task/create')}>
                                                    <Icon name="Plus" /> Ajouter une tâche
                                                </Link>
                                            </TextButton>
                                        </div>
                                    </div>
                                </div>
                                <Kanban user={user} />
                                <AddBtn>
                                    <Link to={isAuthenticated(uid, 'task/create')}>
                                        <Icon name="Plus" />
                                    </Link>
                                </AddBtn>
                                <Routes>
                                    <Route path='task/:id/*' element={
                                        <TaskModal user={user} />
                                    } />
                                    <Route path='task/create' element={
                                        <React.Fragment>
                                            <Head title="Create task" />
                                            <CreateTask user={user} />
                                        </React.Fragment>
                                    } />
                                </Routes>
                            </RootInnerContainer>
                        } />
                        <Route
                            path="activity"
                            element={
                                <React.Fragment>
                                    <Head title="Activity feed" />
                                    <Activity />
                                </React.Fragment>
                            } />
                        <Route
                            path="search"
                            element={
                                <React.Fragment>
                                    <Head title="Search" />
                                    <Search user={user} />
                                </React.Fragment>
                            } />
                        <Route
                            path="login"
                            element={
                                <React.Fragment>
                                    <Head title="Connexion" />
                                    <Login uid={uid} />
                                </React.Fragment>
                            } />
                        <Route
                            path="register"
                            element={
                                <React.Fragment>
                                    <Head title="Register" />
                                    <Register uid={uid} />
                                </React.Fragment>
                            } />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                    <Footer>
                        <div className='footer__inner'>
                            <p>Built by <a href='https://alexandrevurbier.com/' rel='noreferrer'>Alexandre Vurbier</a></p>
                        </div>
                    </Footer>
                </RootInner>
            </BrowserRouter>
        </RootContainer>
    );
}

export default App;

const RootContainer = styled.div`
    position   : relative;
    /* min-height : 100vh; */
    width      : 100vw;
    background : var(--body);
    /* display    : flex; */
    overflow-y : auto;
    overflow-x : hidden;

    .kanban__header {
        display         : flex;
        justify-content : space-between;
        align-items     : flex-end;
        padding-bottom  : 10px;
        margin-bottom   : 20px;

        h1 {
            margin-bottom : 0;

            span {
                color     : var(--text-secondary);
                font-size : 24px;
            }
        }
        
        @media(max-width: 768px) {
            flex-direction : column;
            align-items    : flex-start;

            h1 {
                margin-bottom : 15px;
            }
        }

        .kanban__header-inner {
            display     : flex;
            align-items : center;

            .kanban__header-buttons {
                display : flex;
            }

            @media(max-width: 768px) {
                width : 100%;
                .dropdown-input {
                    width       : 100%;
                }
            }
            @media(max-width: 576px) {
                flex-direction : column;
                .kanban__header-buttons {
                    width         : 100%;
                    margin-bottom : 10px;
                    button {
                        width : 100%;
                    }
                }
            }
        }
    }

    .kanban__header-title {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        padding         : 10px 5px 17px;

        .col__title {
            display        : flex;
            align-items    : flex-end;
            letter-spacing : .5px;
            font-weight    : 500;
            font-size      : 20px;
            line-height    : 20px;
            color          : var(--text);
            
            span {
                position    : relative;
                font-size   : 16px;
                line-height : 16px;
                font-weight : 300;
                margin-left : 24px;
                color       : var(--text-secondary);

                &:before {
                    content          : '';
                    position         : absolute;
                    left             : -19px;
                    bottom           : 50%;
                    transform        : translateY(-50%);
                    height           : 1px;
                    width            : 12px;
                    background-color : var(--text-secondary);
                }
            }
        }
    }
`

const RootInner = styled.div`
    position    : relative;
    width       : calc(100vw - 120px);
    margin-left : 120px;
    min-height  : 100vh;
    height      : auto;
    background  : var(--content-light);
    overflow-x  : hidden;
    overflow-y : auto;

    @media(max-width: 1200px) {
        width  : 100vw;
        margin : 0;
    }
`

const RootInnerContainer = styled.div`
    position   : relative;
    width      : 100%;
    /* min-height : calc(100vh - 60px); */
    background : var(--content-light);
    padding    : 50px 50px;
    /* overflow-x : hidden; */

    @media(max-width: 1366px) {
        padding : 50px 15px 50px;
    }
    @media(max-width: 1200px) {
        padding : 80px 15px 50px;
    }
`

const AddBtn = styled.div`
    position      : fixed;
    right         : 20px;
    bottom        : 20px;
    padding       : 10px;
    border-radius : var(--rounded-full);
    background    : var(--primary);
    box-shadow    : var(--shadow-two);
    z-index       : 10;
    
    svg {
        color : var(--white);
    }
`

const Footer = styled.div`
    position        : absolute;
    bottom          : 0;
    left            : 0;
    right           : 0;
    display         : flex;
    justify-content : center;
    padding         : 15px 0;
    margin-top      : auto;

    .footer__inner {
        display         : flex;
        flex-direction  : column;
        justify-content : center;
        align-items     : center;
    }

    p {
        margin-bottom : 8px;
    }

    a {
        color : var(--primary);
    }
`