import React from 'react'
import { useNavigate } from 'react-router'
import { defaultTaskProps } from 'types/types'

const useFetchTask = (id, tasks) => {
    const [task, setTask] = React.useState(defaultTaskProps)
    const [isLoading, setLoading] = React.useState(true)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (id) {
            if (tasks.length > 0) {
                const t = tasks.find(el => el._id === id)
                if (t) {
                    setTask(t)
                    setLoading(false)
                } else navigate(`/`)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, tasks])

    return { task, isLoading }
}

export default useFetchTask