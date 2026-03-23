import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { ListTodo } from "lucide-react"

export function EmptyTasks() {
    return (
            <Empty className="border border-dashed">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ListTodo />
                    </EmptyMedia>
                    <EmptyTitle>Cadastro de Tarefas</EmptyTitle>
                    <EmptyDescription>
                        Você ainda não possui tarefas agendadas. Cadastre a sua primeira tarefa.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
    )
}