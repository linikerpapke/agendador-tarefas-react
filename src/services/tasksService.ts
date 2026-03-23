import { api } from "./api"

export type Task = {
    id: string,
    nomeTarefa: string,
    descricao: string,
    dataCriacao: string,
    dataEvento: string,
    emailUsuario: string,
    dataAlteracao: string,
    statusNotificacaoEnum: "PENDENTE" | "NOTIFICADO" | "CANCELADO"
}

export type TaskRequest = {
    id?: string
    nomeTarefa: string,
    descricao: string,
    dataEvento: string
}

export const tasksService = {

    async getTasks(): Promise<Task[]> {
        const response = await api.get("/tarefas")
        return response.data
    },

    async postTask(data: TaskRequest) {
        const response = await api.post("/tarefas", data)
        return response.data
    },

    async putTask(id: string, data: TaskRequest) {
        const response = await api.put(`/tarefas?id=${id}`, data)
        return response.data
    },

    async deleteTask(id: string) {
        const response = await api.delete(`/tarefas?id=${id}`)
        return response.data
    },
}