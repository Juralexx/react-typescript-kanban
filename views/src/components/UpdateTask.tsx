import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'reducers'
import { TaskProps, UserProps } from 'types/types'
import { SocketContext, UsersContext } from 'contexts'
import Icon from 'components/tools/icons/Icon'
import Modal from 'components/tools/Modal'
import { DatePicker } from './tools/DatePicker'
import { MediumAvatar, TinyAvatar } from 'components/tools/Avatars'
import { ClassicInput, DropdownInput, Textarea } from 'components/tools/Inputs'
import { Button, TextButton } from 'components/tools/Button'
import { addMemberToArray, removeMemberFromArray, statusToString, stateToString, isSelected, modifyTask } from 'functions/task'
import { addClass, dateParser, goBack } from 'functions/Utils'
import { useSearch } from 'functions/hooks/useSearch'

interface Props {
    task: TaskProps,
    user: UserProps
}

const UpdateTask: React.FC<Props> = ({ task, user }) => {
    const { websocket } = React.useContext(SocketContext)
    const { allUsers } = React.useContext(UsersContext)
    const [navbar, setNavbar] = React.useState(1)
    const [datePicker, setDatePicker] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { launchSearch, isElementInSearchResults, search } = useSearch(allUsers, 'pseudo')

    const [updatedTask, setUpdatedTask] = React.useState<TaskProps>({ ...task })
    React.useEffect(() => { if (task) setUpdatedTask({ ...task }) }, [task])

    return (
        <Modal open={true} onClose={() => navigate('/')}>
            <h2>Modifier la tâche</h2>
            <div className="modal_nav">
                <div className={`modal_nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>
                    Description
                </div>
                <div className={`modal_nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>
                    Membres
                </div>
            </div>
            <TaskModalContainer>
                {navbar === 1 ? (
                    <React.Fragment>
                        <div className="input__title">Titre de la tâche</div>
                        <ClassicInput
                            type="text"
                            className="full"
                            placeholder="Titre..."
                            value={updatedTask.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedTask(prevState => ({ ...prevState, title: e.target.value }))}
                        />
                        <div className="input__title">Description</div>
                        <Textarea
                            type="text"
                            placeholder="Description... "
                            value={updatedTask.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdatedTask(prevState => ({ ...prevState, description: e.target.value }))}
                        />
                        <div className="input__title">Date de fin</div>
                        <ClassicInput
                            type="text"
                            className="full"
                            placeholder="Date de fin"
                            value={dateParser(updatedTask.end)}
                            onChange={() => { }}
                            onClick={() => setDatePicker(true)}
                        />
                        <DatePicker
                            selected={updatedTask.end}
                            onDayClick={(date: Date) => {
                                setUpdatedTask(prevSate => ({ ...prevSate, end: date }))
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
                                    value={statusToString(updatedTask.status)}
                                    position='top'
                                >
                                    <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, status: "normal" }))}>
                                        Normal
                                    </div>
                                    <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, status: "important" }))}>
                                        Important
                                    </div>
                                    <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, status: "priority" }))}>
                                        Prioritaire
                                    </div>
                                </DropdownInput>
                            </div>
                            <div>
                                <div className="input__title">Status</div>
                                <DropdownInput
                                    readOnly
                                    value={stateToString(updatedTask.state)}
                                    position='top'
                                >
                                    <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, state: "todo" }))}>
                                        À traiter
                                    </div>
                                    <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, state: "in progress" }))}>
                                        En cours
                                    </div>
                                    <div onClick={() => setUpdatedTask(prevState => ({ ...prevState, state: "done" }))}>
                                        Terminée
                                    </div>
                                </DropdownInput>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="user_in_array-container">
                            {updatedTask.members!.length > 0 && (
                                updatedTask.members!.map((element, key) => {
                                    return (
                                        <div className="user_in_array" key={key}>
                                            <TinyAvatar pic={element.picture} />
                                            <p>{element.pseudo}</p>
                                            <Icon name="Cross" onClick={() =>
                                                setUpdatedTask(prevState => ({ ...prevState, members: removeMemberFromArray(element, updatedTask.members) }))
                                            } />
                                        </div>
                                    )
                                })
                            )}
                        </div>
                        <ClassicInput
                            type="search"
                            placeholder="Rechercher un membre..."
                            className="mb-3 full"
                            value={search.query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => launchSearch(e.target.value)}
                        />
                        <div className="user_selecter">
                            {allUsers && (
                                <div className="user_displayer">
                                    {allUsers.map((element, key) => {
                                        return (
                                            <div key={key}
                                                className={`user_display_choice ${isElementInSearchResults(element, "flex")} ${isSelected(updatedTask.members, element)}`}
                                                onClick={() => setUpdatedTask(prevState => ({ ...prevState, members: addMemberToArray(element, updatedTask.members) }))}
                                            >
                                                <MediumAvatar pic={element.picture} />
                                                <p>{element.pseudo}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                )}
                <div className='btn_container'>
                    <TextButton onClick={() => goBack()}>
                        Annuler
                    </TextButton>
                    <Button className="sm:ml-2"
                        disabled={updatedTask.title === "" || updatedTask.title === undefined}
                        onClick={() => {
                            modifyTask(updatedTask, allUsers, user, websocket, dispatch)
                            navigate(`/`)
                        }}
                    >
                        Enregistrer
                    </Button>
                </div>
            </TaskModalContainer>
        </Modal>
    )
}

export default UpdateTask

const TaskModalContainer = styled.div`
    position       : relative;
    min-height     : 300px;
    padding-bottom : 60px;
    
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
        width : 100%;
    }

    .btn_container {
        display    : flex;
        position   : absolute;
        bottom     : 0;
        width      : 100%;
        padding    : 10px 0 0;

        button {
            height : 36px;
            &:first-child {
                margin-right : 5px;
            }
        }
    }
`