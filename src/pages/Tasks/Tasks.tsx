import { useTasks } from "@/context/tasks/useTasks"
import { EmptyTasks } from "./tasks-components/EmptyTasks"
import { TaskItem } from "./tasks-components/TaskItem"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DefaultDialog } from "@/components/shared/DefaultDialog"
import { z } from "zod";
import { tasksService, type TaskRequest } from "@/services/tasksService"
import { formatToInputDateTime, formatToBackend } from "@/utils/dateUtils"
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog"

type ModalConfig = {
    title: string
    fields: any[]
    schema?: z.ZodType
    onSave: (data: any) => Promise<void> | void
    onSaveButtonLabel: string
}

type ModalConfirmationConfig = {
    title: string
    description: string
    onConfirm: () => void
}

export function Tasks() {

    const { tasks, fetchTasks } = useTasks()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null)

    const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false)
    const [modalConfirmationConfig, setModalConfirmationConfig] = useState<ModalConfirmationConfig | null>(null)

    const hasTasks = tasks.length > 0

    useEffect(() => {
        fetchTasks()
    }, [])

    async function salvarTarefa(data: any) {

        const payload = {
            ...data,
            dataEvento: formatToBackend(data.dataEvento)
        }

        try {
            await tasksService.postTask(payload)
            fetchTasks()
            //handleToast("Endereço salvo com sucesso")
        } catch (error) {
            //handleToast("Erro ao salvar endereço")
        }
    }

    function cadastrarTarefa() {

        setModalConfig({
            title: "Cadastrar Tarefa",
            fields: [
                { name: "nomeTarefa", label: "Tarefa" },
                { name: "dataEvento", label: "Data e Hora", type: "datetime-local" },
                { name: "descricao", label: "Descrição" },
            ],
            //schema: taskSchema,
            onSave: salvarTarefa,
            onSaveButtonLabel: "Cadastrar"
        })
        setIsModalOpen(true)
    }

    async function atualizarTarefa(id: string, data: any) {

        const payload = {
            ...data,
            dataEvento: formatToBackend(data.dataEvento)
        }

        try {
            await tasksService.putTask(id, payload)
            fetchTasks()
            //handleToast("Endereço salvo com sucesso")
        } catch (error) {
            //handleToast("Erro ao salvar endereço")
        }
    }

    function editarTarefa(tarefa: TaskRequest) {

        setModalConfig({
            title: "Editar Tarefa",
            fields: [
                { name: "nomeTarefa", label: "Tarefa", value: tarefa.nomeTarefa },
                { name: "dataEvento", label: "Data e Hora", type: "datetime-local", value: formatToInputDateTime(tarefa.dataEvento) },
                { name: "descricao", label: "Descrição", value: tarefa.descricao },
            ],
            //schema: taskSchema,
            onSave: (data) => atualizarTarefa(tarefa.id!, data),
            onSaveButtonLabel: "Editar"
        })
        setIsModalOpen(true)
    }

    async function deletarTarefa(id: string) {
        try {
            await tasksService.deleteTask(id)
            fetchTasks()
            //handleToast("Endereço salvo com sucesso")
        } catch (error) {
            //handleToast("Erro ao salvar endereço")
        }
    }

    function excluirTarefa(id: string) {

        setModalConfirmationConfig({
            title: "Deletar Tarefa?",
            description: "Tem certeza que deseja deletar esta tarefa?",
            onConfirm: () => deletarTarefa(id),

        })
        setIsModalConfirmationOpen(true)
    }

    return (
        <div className="min-h-screen flex justify-center p-4">
            <div className="w-full max-w-lg flex flex-col gap-4">
                {!hasTasks ?
                    <EmptyTasks /> :
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} onEdit={editarTarefa} onDelete={excluirTarefa} />
                    ))}
                <Button onClick={cadastrarTarefa} className="cursor-pointer" variant="default" size="sm">
                    Cadastrar Tarefa
                </Button>
            </div>
            <DefaultDialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalConfig?.title || ""}
                fields={modalConfig?.fields || []}
                schema={modalConfig?.schema}
                onSave={modalConfig?.onSave}
                onSaveButtonLabel={modalConfig?.onSaveButtonLabel || "Salvar"}
            />
            <ConfirmationDialog
                open={isModalConfirmationOpen}
                onClose={() => setIsModalConfirmationOpen(false)}
                title={modalConfirmationConfig?.title || ""}
                description={modalConfirmationConfig?.description || ""}
                onConfirm={modalConfirmationConfig?.onConfirm || (() => { })}
            />
        </div>
    )
}