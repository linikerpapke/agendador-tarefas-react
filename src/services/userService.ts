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

//TODO: Tipar corretamente os Any
//TODO: Tipar retorno do CEP:

export interface CepResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  unidade?: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: number,
  gia: number,
  ddd: number,
  siafi: number
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

    async getUserByEmail(): Promise<UserResponse> {
        const email = authService.getEmail()

        if (!email) {
            throw new Error("Token inválido")
        }

        const response = await api.get(`/usuario?email=${email}`)

        return response.data
    },

    async saveEndereco(data: any) {
        const response = await api.post("/usuario/endereco", data)

        return response.data
    },

    async updateEndereco(data: any) {
        const response = await api.put(`/usuario/endereco?id=${data.id}`, data)

        return response.data
    },

    async buscaCep(cep: string) {
        const response = await api.get(`/usuario/endereco/${cep}`)

        return response.data
    },

    async saveTelefone(data: any) {
        const response = await api.post("/usuario/telefone", data)

        return response.data
    },

    async updateTelefone(data: any) {
        const response = await api.put(`/usuario/telefone?id=${data.id}`, data)

        return response.data
    },

}