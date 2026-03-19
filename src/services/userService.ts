import { api } from "./api"
import { authService } from "./authService"

export interface RegisterRequest {
    nome: string,
    email: string,
    senha: string,
}

export interface LoginRequest {
    email: string,
    senha: string,
}

export interface UserResponse {
    id?: string,
    nome: string,
    email: string,
    enderecos:
    {
        id: number,
        rua: string,
        numero: number,
        complemento: number,
        cidade: string,
        estado: string,
        cep: number
    }[] | null,
    telefones:
    {
        id: number,
        numero: number,
        ddd: number
    }[] | null
}

export const userService = {

    async register(data: RegisterRequest) {
        const response = await api.post("/usuario", data);
        return response.data;
    },

    async login(data: LoginRequest) {
        const response = await api.post("/usuario/login", data)
        return response.data
    },

    async getUserByEmail(token: string): Promise<UserResponse> {
        const email = authService.getEmailFromToken(token)

        if (!email) {
            throw new Error("Token inválido")
        }

        const response = await api.get(`/usuario?email=${email}`, {
            headers: {
                Authorization: token
            }
        })

        return response.data
    }
}