import React from 'react'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'reducers'
import { TaskProps, defaultTaskProps, UserProps } from 'types/types'
import { SocketContext, UsersContext } from 'contexts'
import { createTask } from 'reducers/tasks.actions'
import Icon from 'components/tools/icons/Icon'
import Modal from 'components/tools/Modal'
import { MediumAvatar, TinyAvatar } from 'components/tools/Avatars'
import { ClassicInput, DropdownInput, Textarea } from 'components/tools/Inputs'
import { DatePicker } from './tools/DatePicker'
import { Button } from 'components/tools/Button'
import { addClass, dateParser } from 'functions/Utils'
import { addMemberToArray, removeMemberFromArray, stateToString, statusToString, isSelected, getUsers } from 'functions/task'
import { useSearch } from 'functions/hooks/useSearch'

interface Props {
    user: UserProps
}

const CreateTask: React.FC<Props> = ({ user }) => {
    const { websocket } = React.useContext(SocketContext)
    const { allUsers } = React.useContext(UsersContext)
    const [datas, setDatas] = React.useState<TaskProps>(defaultTaskProps)
    const [navbar, setNavbar] = React.useState(1)
    const [datePicker, setDatePicker] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { launchSearch, isElementInSearchResults, search } = useSearch(allUsers, 'pseudo')

    const [searchParams] = useSearchParams()

    React.useEffect(() => {
        if (searchParams.get('state')) {
            setDatas(prev => ({ ...prev, state: searchParams.get('state')!.toString() }))
        }
    }, [searchParams])

    /**
     * 
     */

    const newTask = async () => {
        const task = {
            title: datas.title,
            description: datas.description,
            end: datas.end,
            state: datas.state,
            status: datas.status,
            members: datas.members,
            date: new Date().toISOString(),
            comments: [],
            poster: {
                _id: user._id,
                pseudo: user.pseudo,
                picture: user.picture,
            }
        }
        const activity = {
            type: "create-task",
            date: new Date().toISOString(),
            who: user.pseudo,
            task: datas.title
        }
        dispatch(createTask(task, activity))
        getUsers(allUsers, user._id).map((member: UserProps) => {
            return websocket!.emit("createTask", {
                receiverId: member._id,
                task: task,
                activity: activity
            })
        })
        navigate('/')
        setDatas(defaultTaskProps)
    }

    /**
     * 
     */

    return (
        <Modal open={true} setOpen={() => navigate(`/`)}>
            <h2>Add new task</h2>
            <div className="modal_nav">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>
                    Description
                </div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>
                    Members
                </div>
            </div>

            <TaskModalContainer>
                {navbar === 1 ? (
                    <React.Fragment>
                        <div className="input__title">Task title</div>
                        <ClassicInput
                            type="text"
                            className="full"
                            placeholder="Titre..."
                            value={datas.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(data => ({ ...data, title: e.target.value }))}
                        />

                        <div className="input__title">Description</div>
                        <Textarea
                            type="text"
                            placeholder="Description... "
                            value={datas.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDatas(data => ({ ...data, description: e.target.value }))}
                        />

                        <div className="input__title mr-4">End date</div>
                        <ClassicInput
                            type="text"
                            className="full"
                            placeholder="Date de fin"
                            value={dateParser(datas.end)}
                            onChange={() => { }}
                            onClick={() => setDatePicker(true)}
                        />
                        <DatePicker
                            selected={datas.end}
                            onDayClick={(date: Date) => {
                                setDatas(prevSate => ({ ...prevSate, end: date }))
                                setDatePicker(false)
                            }}
                            open={datePicker}
                            setOpen={setDatePicker}
                        />

                        <div className="double__inputs-container">
                            <div>
                                <div className="input__title">État</div>
                                <DropdownInput
                                    readOnly
                                    value={statusToString(datas.status)}
                                    position='top'
                                >
                                    <div onClick={() => setDatas(data => ({ ...data, status: "normal" }))}>
                                        Normal
                                    </div>
                                    <div onClick={() => setDatas(data => ({ ...data, status: "important" }))}>
                                        Important
                                    </div>
                                    <div onClick={() => setDatas(data => ({ ...data, status: "priority" }))}>
                                        Major
                                    </div>
                                </DropdownInput>
                            </div>
                            <div>
                                <div className="input__title">Status</div>
                                <DropdownInput
                                    readOnly
                                    value={stateToString(datas.state)}
                                    position='top'
                                >
                                    <div onClick={() => setDatas(data => ({ ...data, state: "todo" }))}>
                                        Todo
                                    </div>
                                    <div onClick={() => setDatas(data => ({ ...data, state: "in progress" }))}>
                                        In progress
                                    </div>
                                    <div onClick={() => setDatas(data => ({ ...data, state: "done" }))}>
                                        Done
                                    </div>
                                </DropdownInput>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <>
                        {datas.members!.length > 0 && (
                            <div className="user_in_array-container">
                                {datas.members!.map((element, key) => {
                                    return (
                                        <div className="user_in_array" key={key}>
                                            <TinyAvatar pic={element.picture} />
                                            <p>{element.pseudo}</p>
                                            <Icon name="Cross" onClick={() => setDatas(data => ({ ...data, members: removeMemberFromArray(element, datas.members) }))} />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        <ClassicInput
                            type="search"
                            placeholder="Rechercher un membre..."
                            className="full mb-2"
                            value={search.query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => launchSearch(e.target.value)}
                        />
                        <div className="user_selecter">
                            {allUsers && (
                                <div className="user_displayer">
                                    {allUsers.map((element, key) => {
                                        return (
                                            <div key={key}
                                                className={`user_display_choice ${isElementInSearchResults(element, "flex")} ${isSelected(datas.members, element)}`}
                                                onClick={() => setDatas(data => ({ ...data, members: addMemberToArray(element, datas.members) }))}
                                            >
                                                <MediumAvatar pic={element.picture} />
                                                <p>{element.pseudo}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                )}
                <Button
                    className="mt-5 w-full"
                    disabled={datas.title === "" || datas.title === undefined}
                    onClick={newTask}
                >
                    Save
                </Button>
            </TaskModalContainer>
        </Modal>
    )
}

export default CreateTask

const TaskModalContainer = styled.div`
    position       : relative;
    padding-bottom : 60px;
    min-height     : 300px;

    @media(max-width: 576px) {
        min-height: calc(100vh - 140px);
    }

    .input__title {
        margin-top    : 16px;
        margin-bottom : 6px;
        margin-left   : 3px;
        font-weight   : 500;
    }

    .double__inputs-container {
        display : flex;
        width   : 100%;

        > div {
            width : 50%;

            &:first-child {
                margin-right : 5px;
            }
            &:last-child {
                margin-left : 5px;
            }
        }
    }

    .btn_first {
        position   : absolute;
        bottom     : 0;
        width      : 100%;
        margin-top : 16px;
    }
`