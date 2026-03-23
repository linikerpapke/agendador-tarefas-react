import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { Task, TaskRequest } from "@/services/tasksService"
import { formatDateTimeDisplay } from "@/utils/dateUtils"
import { Calendar1, ChevronDown, Clock } from "lucide-react"

type Props = {
    task: Task
    onEdit: (task: TaskRequest) => void
    onDelete: (id: string) => void
}
export function TaskItem({ task, onEdit, onDelete }: Props) {
    const dateInfo = formatDateTimeDisplay(task.dataEvento)

    return (
        <Card className="w-full">
            <CardContent>
                <Collapsible className="rounded-md data-[state=open]:bg-muted">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="group w-full">
                            {task.nomeTarefa}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar1 />
                                    {dateInfo?.data}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock />
                                    {dateInfo?.hora}
                                </div>
                            </div>
                            <ChevronDown className="ml-auto group-data-[state=open]:rotate-180" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                        <div>
                            {task.descricao}
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => onDelete(task.id)} className="cursor-pointer my-1" size="xs" variant="destructive">
                                Deletar tarefa
                            </Button>
                            <Button onClick={() => onEdit(task)} className="cursor-pointer my-1" size="xs">
                                Editar tarefa
                            </Button>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}
