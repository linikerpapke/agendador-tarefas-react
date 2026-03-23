import type { Task } from "@/services/tasksService";
import { createContext } from "react";

type TasksContextType = {
    tasks: Task[]
    fetchTasks: () => Promise<void>
}

export const TasksContext = createContext({} as TasksContextType)