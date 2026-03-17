import { api } from "./api"

export interface RegisterRequest {
    nome: string,
    email: string,
    senha: string,
}

export interface LoginRequest {
    email: string,
    senha: string,
}

export const userService = {

    async register(data: RegisterRequest) {
        const response = await api.post("/usuario", data);
        return response.data;
    },

    async login(data: LoginRequest) {
        const response = await api.post("/usuario/login", data)
        return response.data
    }

}