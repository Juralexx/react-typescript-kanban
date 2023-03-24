import React from 'react'
import { useAppDispatch, useAppSelector } from 'reducers';
import { getActivities, getTasks } from 'reducers/tasks.actions';
import { TaskProps } from 'types/types';

interface ContextProps {
    children: React.ReactNode | string | JSX.Element | JSX.Element[];
}

interface TasksContextProps {
    tasks: Array<TaskProps>,
    sortedTasks: {
        [key:string | number | symbol]: any
    }
    activities: any[]
}

const defaultTasksContextProps : TasksContextProps = {
    tasks: [],
    sortedTasks: {},
    activities: []
}

export const TasksContext = React.createContext<TasksContextProps>(defaultTasksContextProps)

const TasksContextProvider = ({ children }: ContextProps) => {
    const tasks = useAppSelector((state: any) => state.tasksReducer)
    const activities = useAppSelector((state: any) => state.activitiesReducer)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getTasks())
        dispatch(getActivities())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sortedTasks = {
        'todo': tasks.filter((element: TaskProps) => element.state === "todo"),
        'in progress': tasks.filter((element: TaskProps) => element.state === "in progress"),
        'done': tasks.filter((element: TaskProps) => element.state === "done")
    }

    return (
        <TasksContext.Provider value={{ tasks, sortedTasks, activities }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContextProvider