import React from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import { SearchContext, TasksContext } from 'contexts'
import { TaskProps, UserProps } from 'types/types'
import Ticket from 'components/Ticket'
import { stateToString } from 'functions/task'

interface Props {
    user: UserProps
}

const Search = ({ user }: Props) => {
    const { sortedTasks } = React.useContext(TasksContext)
    const [selectedTask, setSelectedTask] = React.useState<TaskProps>({})

    const [searchParams, setSearchParams] = useSearchParams()
    const { search, launchSearch } = React.useContext(SearchContext)

    React.useEffect(() => {
        if (search.state) {
            if (search.query.length > 0)
                setSearchParams({ q: search.query })
            else setSearchParams({})
        }
    }, [search])

    window.onload = () => {
        if (searchParams.get('q'))
            launchSearch(searchParams.get('q')!)
    }

    return (
        <SearchContainer>
            <div className="kanban__header">
                <h1>Search</h1>
            </div>
            {(search.state ? Object.entries(search.results) : Object.entries(sortedTasks))
                .map(([name, array]: any, i: number) => {
                    return (
                        <React.Fragment key={i}>
                            {array.length > 0 && (
                                <React.Fragment>
                                    <div className="kanban__header-title">
                                        <div className="col__title">
                                            {stateToString(name)} <span>{array.length}</span>
                                        </div>
                                    </div>
                                    <div className='search__grid'>
                                        {array.map((element: TaskProps, key: number) => {
                                            return (
                                                <div onMouseDown={() => setSelectedTask(element)} key={key}>
                                                    <Ticket
                                                        task={element}
                                                        selectedTask={selectedTask}
                                                        user={user}
                                                        uniqueKey={'' + i + key}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )
                })}
            {search.state && Object.keys(search.results).length === 0 &&
                <p>Aucun résultats ne correspond à votre recherche...</p>
            }
        </SearchContainer>
    )
}

export default Search

const SearchContainer = styled.div`
    position   : relative;
    width      : 100%;
    min-height : calc(100vh - 60px);
    background : var(--content-light);
    overflow-x : hidden;
    padding    : 50px 50px;

    @media(max-width: 1366px) {
        padding : 50px 15px 50px;
    }
    @media(max-width: 1200px) {
        padding : 80px 15px 50px;
    }

    .search__grid {
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
    }
`