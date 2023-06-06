import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TaskProps, UserProps } from 'types/types';
import { UsersContext, SocketContext } from 'contexts';
import Icon from './tools/icons/Icon';
import ToolsMenu from 'components/tools/ToolsMenu'
import Warning from 'components/tools/Warning';
import Palette from './Palette';
import { addActive, getDifference, isAuthenticated, numericDateParser } from 'functions/Utils'
import { stateToBackground, statusToBorder, isDatePassed, stateToString, statusToString, statusToBackground, removeTask } from 'functions/task'

interface Props {
    task: TaskProps,
    selectedTask: TaskProps,
    user: UserProps,
    dragged?: boolean,
    uniqueKey: string | number
}

const Ticket = ({ task, selectedTask, user, dragged, uniqueKey }: Props) => {
    const { allUsers } = React.useContext(UsersContext)
    const { websocket } = React.useContext(SocketContext)
    const dispatch = useDispatch()

    const [warning, setWarning] = React.useState<number | string>(-1)

    return (
        <KanbanTicket
            className={`kanban__ticket ${addActive(dragged && selectedTask._id === task._id)} ${statusToBorder(task.status)}`}
            style={{ backgroundColor: task.color !== '#ffffff' ? `${task.color}72` : '#ffffff' }}
        >
            <div className="kanban__ticket-status">
                <div className="kanban__ticket-status-inner">
                    <div className={`__details ${stateToBackground(task.state)}`}>
                        {stateToString(task.state)}
                    </div>
                    <div className={`__details mx-2 ${statusToBackground(task.status)}`}>
                        {statusToString(task.status)}
                    </div>
                </div>
                <div className="kanban__ticket-status-inner">
                    <div className={`__details mr-2 ${isDatePassed(task.end)}`}>
                        {numericDateParser(task.end)}
                    </div>
                    {user._id &&
                        <Palette task={task} />
                    }
                    <ToolsMenu>
                        <Link to={isAuthenticated(user._id, `/task/${task._id}`)}>
                            See
                        </Link>
                        <Link to={isAuthenticated(user._id, `/task/${task._id}/update`)}>
                            Update
                        </Link>
                        <Link to={isAuthenticated(user._id, `/task/${task._id}/?action=comment`)}>
                            Comment
                        </Link>
                        <div onClick={() => setWarning(uniqueKey)}>
                            Delete
                        </div>
                    </ToolsMenu>
                </div>
            </div>
            <Link className="kanban__ticket-title two_lines" to={isAuthenticated(user._id, `/task/${task._id}`)}>
                {task.title}
            </Link>
            <div className="kanban__ticket-description">
                {task.description ? task.description : <em>No description</em>}
            </div>
            <div className="kanban__ticket-bottom">
                {task.comments!.length > 0 &&
                    <div className="kanban__ticket-comments">
                        <Icon name="Chat" className="mr-1 w-4 h-4" />{task.comments!.length}
                    </div>
                }
                {task.members!.length > 0 && (
                    <div className="kanban__ticket-members">
                        {task.members!.slice(0, 5).map((member, i) => {
                            return <img key={i} className="kanban__ticket-member-img" src={member.picture} alt="" />
                        })}
                        {task.members!.length > 3 &&
                            <div className="get_difference">
                                {getDifference(5, task.members!.length)}
                            </div>
                        }
                    </div>
                )}
            </div>
            {Object.keys(selectedTask).length > 0 &&
                <Warning
                    title={`Delete task : ${selectedTask.title} ?`}
                    text="This action is irreversible."
                    validateBtn="Delete"
                    open={warning === uniqueKey}
                    setOpen={setWarning}
                    onValidate={() => removeTask(selectedTask, allUsers, user, websocket, dispatch)}
                />
            }
        </KanbanTicket>
    )
}

export default Ticket

const KanbanTicket = styled.div`
    position      : relative;
    padding       : 12px;
    margin-bottom : 12px;
    background    : var(--content);
    border-radius : var(--rounded-md);
    box-shadow    : var(--shadow-relief);
    cursor        : pointer;

    &.active {
        box-shadow : var(--shadow-two);
    }

    &:hover {
        .palette {
            width      : 32px;
            opacity    : 1;
            visibility : visible;
            transition : visibility .4s, opacity .4s, width .2s;
        }
    }

    &.priority {
        border-left : 4px solid var(--red);
    }
    &.important {
        border-left : 4px solid var(--orange);
    }
    &.normal {
        border-left : 4px solid var(--light-blue);
    }

    .kanban__ticket-comments {
        display     : flex;
        align-items : center;
        svg {
            color        : var(--text-secondary);
            margin-right : 5px;
            height       : 18px;
            width        : 18px;
        }
    }

    .kanban__ticket-status {
        display         : flex;
        justify-content : space-between;

        .kanban__ticket-status-inner {
            display     : flex;
            align-items : center;
        }
    }

    .ticket__menu {
        position : absolute;
        right    : 6px;
        top      : 6px;
    }

    .kanban__ticket-title {
        font-weight     : 500;
        padding         : 6px 0;
        vertical-align  : middle;
    }

    .kanban__ticket-description {
        margin-bottom      : 10px;
        font-size          : 13px;
        color              : var(--text-secondary);
        text-overflow      : ellipsis;
        overflow           : hidden;
        width              : 100%;
        line-height        : 19px;
        display            : -webkit-box;
        -webkit-line-clamp : 3;
        -webkit-box-orient : vertical;
    }

    .kanban__ticket-bottom {
        display         : flex;
        align-items     : center;
        justify-content : space-between;

        .kanban__ticket-members {
            display  : flex;
            position : relative;
            height   : 26px;

            .kanban__ticket-member-img {
                height        : 26px;
                min-height    : 26px;
                width         : 26px;
                min-width     : 26px;
                border-radius : var(--rounded-full);
                border        : 1px solid var(--content);
                margin-left   : -10px;

                &:first-child {
                    margin-left : 0;
                }
            }
        }

        .get_difference {
            height           : 26px;
            min-height       : 26px;
            width            : 26px;
            min-width        : 26px;
            text-align       : center;
            font-weight      : 600;
            padding          : 6px 0 4px;
            background-color : var(--content-light);
            border-radius    : var(--rounded-full);
            margin-left      : -10px;
        }
    }
`