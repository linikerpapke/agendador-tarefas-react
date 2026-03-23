import { tasksService, type Task } from "@/services/tasksService"
import { useState } from "react"
import { TasksContext } from "./TasksContext"

type Props = {
    children: React.ReactNode
}

export function TasksProvider({ children }: Props) {
    const [tasks, setTasks] = useState<Task[]>([])

    async function fetchTasks() {
        const data = await tasksService.getTasks()
        setTasks(data)
    }

    return (
        <TasksContext.Provider value={{ tasks, fetchTasks }}>
            {children}
        </TasksContext.Provider>
    )
}