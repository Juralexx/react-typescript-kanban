import { randomizedArrayNoRepeats } from "functions/Utils"
import { stateToString } from './task'

export const activityFeedContent = (element) => {
    switch (element.type) {
        case "create-task":
            return <p><span>{element.who}</span> a ajouté une nouvelle tâche : <span>{element.task}</span>.</p>
        case "update-task":
            return <p><span>{element.who}</span> a modifié la tâche <span>{element.task}</span>.</p>
        case "update-task-state":
            return <p><span>{element.who}</span> a modifié l'état de la tâche <span>{element.task}</span> de <span>{stateToString(element.prev_state)}</span> à <span>{stateToString(element.new_state)}</span>.</p>
        case "delete-task":
            return <p><span>{element.who}</span> a supprimé la tâche <span>{element.task}</span>.</p>
        case "name-admin":
            return <p><span>{element.who}</span> a nommé <span>{element.new_admin}</span> Administrateur.</p>
        case "join-project":
            return <p><span>{element.who}</span> a rejoint le projet</p>
        case "exclude-from-project":
            return <p><span>{element.who}</span> a exclu <span>{element.excluded}</span>.</p>
        case "leave-project":
            return <p><span>{element.leaver}</span> a quitté le projet.</p>
        case "create-qna":
            return <p><span>{element.who}</span> a créé une <span>FAQ</span>.</p>
        case "update-qna":
            return <p><span>{element.who}</span> a modifié la <span>FAQ</span>.</p>
        case "delete-qna":
            return <p><span>{element.who}</span> a supprimé la <span>FAQ</span>.</p>
        case "add-actuality":
            return <p><span>{element.who}</span> a ajouté une nouvelle actualité : <span>{element.actuality}</span>.</p>
        case "update-actuality":
            return <p><span>{element.who}</span> a modifié l'actualité : <span>{element.actuality}</span>.</p>
        case "delete-actuality":
            return <p><span>{element.who}</span> a supprimé l'actualité : <span>{element.actuality}</span>.</p>
        default:
            <p><em>Cet élément n'est pas disponible.</em></p>
            break;
    }
}


export const randomColor = randomizedArrayNoRepeats(['blue', 'light-blue', 'turquoise', 'green', 'purple-light', 'red-light', 'yellow', 'orange'])