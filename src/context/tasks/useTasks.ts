import { useContext } from "react";
import { TasksContext } from "./TasksContext";

export function useTasks() {
    return useContext(TasksContext)
}