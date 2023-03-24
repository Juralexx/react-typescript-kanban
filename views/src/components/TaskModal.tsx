import React from 'react'
import styled from 'styled-components'
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { SocketContext, TasksContext, UsersContext } from 'contexts'
import { useAppDispatch } from 'reducers'
import { CommentProps, UserProps } from 'types/types'
import Head from 'Head'
import CircleLoader from 'components/tools/CircleLoader'
import Modal from 'components/tools/Modal'
import UpdateTask from './UpdateTask'
import { TinyAvatar } from 'components/tools/Avatars'
import { Button, TextButton } from 'components/tools/Button'
import { Textarea } from 'components/tools/Inputs'
import { dateParser, getDifference, getHourOnly, isAuthenticated, reverseArray } from 'functions/Utils'
import { handleComment, isDatePassed, stateToBackground, stateToString, statusToBackground, statusToString } from 'functions/task'
import useFetchTask from 'functions/hooks/useFetchTask'

interface Props {
    user: UserProps
}

const TaskModal: React.FC<Props> = ({ user }) => {
    const { websocket } = React.useContext(SocketContext)
    const { allUsers } = React.useContext(UsersContext)
    const { tasks } = React.useContext(TasksContext)
    const { id } = useParams()
    const { task, isLoading } = useFetchTask(id, tasks)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const textareaRef = React.useRef() as React.MutableRefObject<HTMLTextAreaElement>
    const [comment, setComment] = React.useState({ state: searchParams.get('action') === 'comment' ? true : false, text: "" })

    React.useEffect(() => {
        if (searchParams.get('action') && searchParams.get('action') === 'comment')
            if (textareaRef?.current)
                textareaRef.current.focus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, textareaRef.current])

    return (
        <React.Fragment>
            <Head title={task.title} />
            <Routes>
                <Route index element={
                    <Modal open={true} onClose={() => navigate('/')}>
                        <TaskModalContainer>
                            {!isLoading ? (
                                <React.Fragment>
                                    <div className="task-modal_header">
                                        <h4>{task.title}</h4>
                                        <p>{task.poster!.pseudo} le {dateParser(task.date)} à {getHourOnly(new Date(task.date || ''))}</p>
                                        <div className="details__container">
                                            <div className={`__details ${stateToBackground(task.state)}`}>
                                                {stateToString(task.state)}
                                            </div>
                                            <div className={`__details mx-2 ${statusToBackground(task.status)}`}>
                                                {statusToString(task.status)}
                                            </div>
                                            <div className={`__details ${isDatePassed(task.end)}`}>
                                                {dateParser(task.end)}
                                            </div>
                                        </div>
                                        <div className='task__members'>
                                            {task.members!.slice(0, 7).map((member, key) => {
                                                return <div className="pseudo mr-1" key={key}>
                                                    {member.pseudo!.substring(0, 3)}
                                                </div>
                                            })}
                                            {task.members!.length > 7 &&
                                                <div className="get_difference">
                                                    {getDifference(7, task.members!.length)}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="task-modal-description">{task.description}</div>
                                    {comment.state &&
                                        <div className="add-comment-container">
                                            <div className="mb-2">Commentaire</div>
                                            <Textarea
                                                useRef={textareaRef}
                                                placeholder="Ajouter un commentaire..."
                                                value={comment.text}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(prevState => ({ ...prevState, text: e.target.value }))}
                                            />
                                        </div>
                                    }
                                    {!comment.state ? (
                                        <div className="btn_container">
                                            <TextButton className="mr-2" onClick={() => setComment(prevState => ({ ...prevState, state: true }))}>
                                                Commenter
                                            </TextButton>
                                            <Button>
                                                <Link to={isAuthenticated(user?._id, 'update')}>
                                                    Modifier
                                                </Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="btn_container">
                                            <Button className="mr-1" onClick={() => {
                                                handleComment(comment, task, user, allUsers, websocket, dispatch)
                                                setComment({ state: false, text: "" })
                                            }}>
                                                Enregistrer
                                            </Button>
                                            <TextButton onClick={() => setComment(prevState => ({ ...prevState, state: false }))}>
                                                Annuler
                                            </TextButton>
                                        </div>
                                    )}
                                    <div className="comments-container custom-scrollbar">
                                        {task.comments &&
                                            task.comments.length > 0 ? (
                                            reverseArray(task.comments).map((element: CommentProps, key: number) => {
                                                return (
                                                    <div className="comment" key={key}>
                                                        <div className="comment-header">
                                                            <div className='comment-commenter'>
                                                                <TinyAvatar pic={element.poster!.picture} />
                                                                {element.poster!.pseudo}
                                                            </div>
                                                            {task.date &&
                                                                <p className='date'>Le {dateParser(element.date)} à {getHourOnly(new Date(task.date))}</p>
                                                            }
                                                        </div>
                                                        <div className="comment-body">{element.text}</div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="empty-array">Aucun commentaire pour le moment</div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ) : (
                                <CircleLoader />
                            )}
                        </TaskModalContainer>
                    </Modal>
                } />
                <Route path="update" element={
                    Object.keys(task).length > 0 && (
                        <UpdateTask task={task} user={user} />
                    )
                } />
            </Routes>
        </React.Fragment>
    )
}

export default TaskModal

const TaskModalContainer = styled.div`
    .task-modal_header {
        padding-bottom : 10px;
        border-bottom  : 1px solid var(--light-border);

        h4 {
            margin-bottom : 0;
        }

        p {
            color         : var(--text-secondary);
            font-size     : 14px;
            margin-bottom : 10px;
        }

        .details__container {
            display         : flex;
            justify-content : space-between;

            > div {
                width : 100%;
            }
        }
    }

    .task__members {
        display         : flex;
        align-items     : center;
        justify-content : flex-end;
        padding-top     : 10px;

        .pseudo {
            display          : flex;
            align-items      : center;
            height           : 26px;
            padding          : 3px 8px 2px;
            font-size        : 12px;
            background-color : var(--primary);
            border-radius    : var(--rounded-sm);
            color            : white;
        }

        .get_difference {
            height           : 26px;
            min-height       : 26px;
            width            : 26px;
            min-width        : 26px;
            text-align       : center;
            font-weight      : 500;
            padding          : 6px 0 4px;
            background-color : var(--content-light);
            border-radius    : var(--rounded-sm);
            margin-left      : 3px;
        }
    }

    .task-modal-description {
        padding    : 20px 0;
        max-height : 200px;
        overflow-y : auto;
    }

    .btn_container {
        display         : flex;
        justify-content : flex-end;
        padding         : 10px 0;
        button {
            height : 36px;
            &:first-child {
                margin-right : 5px;
            }
        }
    }

    .add-comment-container {
        padding    : 20px 0 0;
        border-top : 1px solid var(--light-border);
    }

    .comments-container {
        position   : relative;
        border-top : 1px solid var(--light-border);
        font-size  : 12px;
        max-height : 300px;
        overflow-y : auto;

        .is-empty {
            padding : 20px 0 0;
        }
    }

    .comment {
        padding       : 10px 0;
        border-bottom : 1px solid var(--light-border);

        .comment-header {
            display         : flex;
            justify-content : space-between;
            margin-bottom   : 3px;

            .comment-commenter {
                display     : flex;
                align-items : center;
                font-size   : 13px;
                font-weight : 600;
            }

            .date {
                color     : var(--text-secondary);
                font-size : 12px;
            }
        }

        .comment-body {
            padding       : 10px 10px;
            background    : var(--content-light);
            border-radius : var(--rounded-md);
        }

        &:last-child {
            border-bottom : none;
        }
    }

    .circle-loader {
        position  : absolute;
        top       : 50%;
        left      : 50%;
        transform : translate(-50%, -50%);
    }
`