import React from 'react'
import { TaskProps } from 'types/types';
import { highlightSearchResults, removeAccents } from 'functions/Utils';
import { TasksContext } from './TasksContext';

interface ContextProps {
    children: React.ReactNode | string | JSX.Element | JSX.Element[];
}

export interface SearchProps {
    state: boolean,
    query: string,
    results: any,
}

export const defaultSearchProps: SearchProps = {
    state: false,
    query: '',
    results: {},
}

interface TasksContextProps {
    search: SearchProps,
    setSearch: React.Dispatch<React.SetStateAction<SearchProps>>,
    launchSearch: (query: string) => void
}

const defaultTasksContextProps: TasksContextProps = {
    search: defaultSearchProps,
    setSearch: () => { },
    launchSearch: () => { }
}

export const SearchContext = React.createContext<TasksContextProps>(defaultTasksContextProps)

const SearchContextProvider = ({ children }: ContextProps) => {
    const { tasks, sortedTasks } = React.useContext(TasksContext)
    const [search, setSearch] = React.useState<SearchProps>({ ...defaultSearchProps, results: sortedTasks })

    const launchSearch = (query: string) => {
        setSearch(prev => ({ ...prev, query: query }))

        let isEmpty = !search.results || search.results.length === 0
        let regexp = new RegExp(removeAccents(query), 'i')

        highlightSearchResults(query, 'kanban__ticket-title')

        if (query.length >= 2) {
            const response = tasks.filter((element: TaskProps) => regexp.test(removeAccents(element['title'])))

            let sortedResponse = {}

            if (response.length > 0) {
                sortedResponse = {
                    'todo': response.filter((element: TaskProps) => element.state === "todo"),
                    'in progress': response.filter((element: TaskProps) => element.state === "in progress"),
                    'done': response.filter((element: TaskProps) => element.state === "done")
                }
            } else {
                sortedResponse = {}
            }

            setSearch(prev => ({ ...prev, state: true, results: sortedResponse }))
            if (isEmpty)
                return
        } else {
            setSearch(prev => ({ ...prev, state: false, results: sortedTasks }))
        }
    }

    return (
        <SearchContext.Provider value={{ search, setSearch, launchSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider