import { EmptyTasks } from "./tasks-components/EmptyTasks"

export function Tasks() {
    return (
        <div className="min-h-screen flex justify-center items-start p-10">
            <EmptyTasks />
        </div>
    )
}