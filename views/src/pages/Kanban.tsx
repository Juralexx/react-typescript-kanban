import React from 'react'
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Draggable, DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from 'components/StrictModeDroppable';
import { TaskProps, UserProps } from 'types/types';
import { SocketContext, UsersContext, TasksContext } from 'contexts';
import Icon from 'components/tools/icons/Icon';
import Ticket from 'components/Ticket';
import ToolsMenu from 'components/tools/ToolsMenu';
import { stateToString, updateTaskState } from 'functions/task'
import { isAuthenticated } from 'functions/Utils';

interface Props {
    user: UserProps
}

const Kanban: React.FC<Props> = ({ user }: Props) => {
    const { allUsers } = React.useContext(UsersContext)
    const { websocket } = React.useContext(SocketContext)
    const { sortedTasks } = React.useContext(TasksContext)
    const dispatch = useDispatch()

    const [selectedTask, setSelectedTask] = React.useState<TaskProps>({})
    const [toState, setToState] = React.useState<string>("")

    const [dragged, setDragged] = React.useState<boolean>(false)

    const getState = (index: number) => {
        if (dragged) setToState(Object.keys(sortedTasks)[index])
    }
    return (
        <KanbanContainer>
            <DragDropContext
                onDragStart={() => setDragged(true)}
                onDragUpdate={() => user && updateTaskState(selectedTask, toState, allUsers, user, websocket, dispatch)}
                onDragEnd={() => setDragged(false)}
            >
                {Object.entries(sortedTasks).map(([name, array], i: number) => {
                    return (
                        <StrictModeDroppable droppableId={name} key={i}>
                            {(provided) => (
                                <div className={`kanban__col ${dragged && toState === name ? '__highlighted' : 'normal'}`}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    onMouseEnter={() => getState(i)}
                                >
                                    <div className="kanban__header-title" key={i}>
                                        <div className="col__title">
                                            {stateToString(name)} <span>{array.length}</span>
                                        </div>
                                        <ToolsMenu>
                                            <Link to={isAuthenticated(user._id, `/task/create/?state=${name}`)}>
                                                Ajouter une tâche « {stateToString(name)} »
                                            </Link>
                                        </ToolsMenu>
                                    </div>
                                    {array.length > 0 ? (
                                        array.map((element: TaskProps, key: number) => {
                                            return (
                                                <Draggable
                                                    draggableId={(element._id)!.toString()}
                                                    index={key}
                                                    key={element._id}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div ref={provided.innerRef}
                                                                // snapshot={snapshot}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                onMouseDown={() => setSelectedTask(element)}
                                                            >
                                                                <Ticket
                                                                    task={element}
                                                                    selectedTask={selectedTask}
                                                                    user={user}
                                                                    dragged={dragged}
                                                                    uniqueKey={'' + i + key}
                                                                />
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })
                                    ) : (
                                        <div className="empty__content">
                                            <Icon name="Clipboard" className="w-9 h-9 mb-2" />
                                            <div>Vous n'avez aucunes tâches <span>{stateToString(name)}.</span></div>
                                        </div>
                                    )}
                                    <Link to={isAuthenticated(user._id, `/task/create/?state=${name}`)} className='__add'>
                                        Add task
                                        <Icon name="Plus" />
                                    </Link>
                                    {provided.placeholder}
                                </div>
                            )}
                        </StrictModeDroppable>
                    )
                })}
            </DragDropContext>
            <Outlet />
        </KanbanContainer>
    )
}

export default Kanban

const KanbanContainer = styled.div`
    position              : relative;
    display               : grid;
    grid-gap              : 30px;
    grid-template-columns : repeat(auto-fill, minmax(30%, 1fr));
    padding               : 10px 0;
    height                : auto;
    align-items           : flex-start;
    padding               : 5px;

    @media(max-width: 1366px) {
        grid-gap : 15px;
    }

    @media(max-width: 992px) {
        grid-template-columns : 1fr;
    }

    .kanban__col {
        position      : relative;
        padding       : 10px 10px 54px;
        border-radius : var(--rounded-md);
        box-shadow    : var(--shadow-tiny);
        min-width     : 310px;

        &:before {
            content       : '';
            position      : absolute;
            top           : 0;
            left          : 0;
            right         : 0;
            width         : 100%;
            height        : 4px;
            border-radius : var(--rounded-md) var(--rounded-md) 0 0;
        }

        &:nth-child(1) {
            &:before {
                background : linear-gradient(to right, #c776e7, #dc6c87);
            }
        }
        &:nth-child(2) {
            &:before {
                background : linear-gradient(to right, #96a4fd, #67b0f8);
            }
        }
        &:nth-child(3) {
            &:before {
                background : linear-gradient(to right, #78d3a6, #7bd4ec);
            }
        }
    }

    .__add {
        position        : absolute;
        bottom          : 10px;
        left            : 0;
        display         : flex;
        align-items     : center;
        justify-content : center;
        color           : var(--text-secondary);
        font-weight     : 500;
        font-size       : 16px;
        width           : 100%;
        padding         : 10px 0;
        text-shadow     : 0 0 2px #fff;

        svg {
            width         : 16px;
            height        : 16px;
            padding       : 1px;
            border        : 1px solid var(--text-secondary);
            
            border-radius : var(--rounded-full);
            margin-left   : 5px;
            g {
                stroke-width : 3px;
            }
        }
    }

    .empty__content {
        text-align  : center;
        padding     : 10px 0;
        font-weight : 600;
        svg {
            margin : 0 auto 10px;
        }
    }

    .__highlighted {
        background-color : rgba(var(--primary-rgb), 0.1);
        border-radius    : var(--rounded-md);
    }
`