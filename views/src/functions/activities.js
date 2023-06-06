import { randomizedArrayNoRepeats } from "functions/Utils"
import { stateToString } from './task'

export const activityFeedContent = (element) => {
    switch (element.type) {
        case "create-task":
            return <p><span>{element.who}</span> created a new task : <span>{element.task}</span>.</p>
        case "update-task":
            return <p><span>{element.who}</span> updated task <span>{element.task}</span>.</p>
        case "update-task-state":
            return <p><span>{element.who}</span> updated task state <span>{element.task}</span> from <span>{stateToString(element.prev_state)}</span> to <span>{stateToString(element.new_state)}</span>.</p>
        case "delete-task":
            return <p><span>{element.who}</span> deleted task <span>{element.task}</span>.</p>
        default:
            <p><em>This activity is not available...</em></p>
            break;
    }
}


export const randomColor = randomizedArrayNoRepeats(['blue', 'light-blue', 'turquoise', 'green', 'purple-light', 'red-light', 'yellow', 'orange'])