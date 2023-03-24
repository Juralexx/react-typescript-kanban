export interface UserProps {
    _id?: string,
    pseudo: string,
    picture: string,
    tasks: Array<string>
}

export interface TaskUserProps {
    _id?: string,
    pseudo?: string,
    picture?: string,
}

export interface CommentProps {
    _id?: string,
    text?: string,
    date?: string,
    poster?: {
        _id?: string,
        pseudo?: string,
        picture?: string,
    },
}

export interface TaskProps {
    _id?: string,
    title?: string,
    description?: string,
    state?: String,
    status?: String,
    end?: Date | string,
    date?: Date | string,
    poster?: TaskUserProps,
    members?: Array<TaskUserProps>,
    comments?: Array<CommentProps>,
    color?: string,
    background?: string,
    createdAt?: string,
    updatedAt?: string
}

export const defaultTaskProps: TaskProps = {
    title: "",
    description: "",
    state: "todo",
    status: "normal",
    end: new Date().toISOString(),
    date: new Date().toISOString(),
    members: [],
    comments: []
}


export interface TasksProps extends Array<TaskProps> { }

export const defaultTasksProps: TasksProps = []

export interface reduxDispatch {
    type?: string,
    payload?: any
}

export interface SearchProps {
    state: boolean,
    query: string,
    results: any,
}

export const defaultSearchProps: SearchProps = {
    state: false,
    query: '',
    results: [],
}