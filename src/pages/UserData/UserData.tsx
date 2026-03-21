import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { toast } from "sonner"
import { useUser } from "@/context/user/useUser"
import {
    Pencil,
    Search,
    Trash2
} from "lucide-react"
import { useState } from "react";
import { DefaultDialog } from "@/components/shared/DefaultDialog";
import { userService, type Endereco, type Telefone } from "@/services/userService";

type ModalConfig = {
    title: string
    fields: any[]
    schema?: z.ZodType
    onSave: (data: any) => Promise<void> | void
    onSaveButtonLabel: string
}

export function UserData() {

    const { user, refreshUser } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null)

    const enderecoSchema = z.object({
        cep: z.string().min(8, "CEP Inválido").max(9, "O CEP é Inválido"),
        rua: z.string().min(3, "Logradouro é obrigatório"),
        numero: z.coerce.number(),
        complemento: z.string().optional(),
        cidade: z.string().min(2, "Informe a cidade"),
        estado: z.string().min(2).max(2, "Informe o Estado corretamente, exemplo: SP"),
    });

    const telefoneSchema = z.object({
        ddd: z.coerce.string().min(2).max(2),
        numero: z.coerce.string().max(8),
    });

    const handleToast = (text: string) => {
        toast(text, { position: "bottom-center" })
    }

    async function salvarEndereco(data: any) {
        try {
            await userService.saveEndereco(data)
            refreshUser()
            handleToast("Endereço salvo com sucesso")
        } catch (error) {
            handleToast("Erro ao salvar endereço")
        }
    }

    function cadastrarEndereco() {

        setModalConfig({
            title: "Cadastrar Endereço",
            fields: [
                {
                    name: "cep", label: "Cep", button: {
                        icon: <Search />,
                        onClick: async (cep: string, helpers: any) => {
                            const response = await userService.buscaCep(cep)
                            helpers.setValues({
                                rua: response.logradouro,
                                numero: response.complemento,
                                complemento: response.regiao,
                                cidade: response.localidade,
                                estado: response.uf,
                            })
                        }
                    }
                },
                { name: "rua", label: "Rua" },
                { name: "numero", label: "Número" },
                { name: "complemento", label: "Complemento" },
                { name: "cidade", label: "Cidade" },
                { name: "estado", label: "Estado" },
            ],
            schema: enderecoSchema,
            onSave: salvarEndereco,
            onSaveButtonLabel: "Salvar"
        })
        setIsModalOpen(true)
    }

    async function editarEndereco(id: number, data: Endereco) {
        try {
            await userService.updateEndereco(id, data)
            refreshUser()
            handleToast("Endereço atualizado com sucesso")
        } catch (error) {
            handleToast("Erro ao atualizar endereço")
        }
    }

    function atualizarEndereco(endereco: Endereco) {

        setModalConfig({
            title: "Editar Endereço",
            fields: [
                {
                    name: "cep", label: "Cep", value: endereco.cep, button: {
                        icon: <Search />,
                        onClick: async (cep: string, helpers: any) => {
                            const response = await userService.buscaCep(cep)
                            helpers.setValues({
                                rua: response.logradouro,
                                numero: response.complemento,
                                complemento: response.regiao,
                                cidade: response.localidade,
                                estado: response.uf,
                            })
                        }
                    }
                },
                { name: "rua", label: "Rua", value: endereco.rua },
                { name: "numero", label: "Número", value: endereco.numero },
                { name: "complemento", label: "Complemento", value: endereco.complemento },
                { name: "cidade", label: "Cidade", value: endereco.cidade },
                { name: "estado", label: "Estado", value: endereco.estado },
            ],
            schema: enderecoSchema,
            onSave: (data) => editarEndereco(endereco.id!, data),
            onSaveButtonLabel: "Atualizar"
        })
        setIsModalOpen(true)
    }

    async function salvarTelefone(data: Telefone) {
        try {
            await userService.saveTelefone(data)
            refreshUser()
            handleToast("Telefone salvo com sucesso")
        } catch (error) {
            handleToast("Erro ao salvar o telefone")
        }
    }

    function cadastrarTelefone() {

        setModalConfig({
            title: "Cadastrar Telefone",
            fields: [
                { name: "ddd", label: "DDD" },
                { name: "numero", label: "Número" },
            ],
            schema: telefoneSchema,
            onSave: salvarTelefone,
            onSaveButtonLabel: "Salvar"
        })
        setIsModalOpen(true)
    }

    async function editarTelefone(id: number, data: Telefone) {
        try {
            await userService.updateTelefone(id, data)
            refreshUser()
            handleToast("Telefone atualizado com sucesso")
        } catch (error) {
            handleToast("Erro ao atualizar o telefone")
        }
    }

    function atualizarTelefone(telefone: Telefone) {
        setModalConfig({
            title: "Editar Telefone",
            fields: [
                { name: "ddd", label: "DDD", value: telefone.ddd },
                { name: "numero", label: "Número", value: telefone.numero },
            ],
            schema: telefoneSchema,
            onSave: (data) => editarTelefone(telefone.id!, data),
            onSaveButtonLabel: "Atualizar"
        })
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center p-10">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Gerenciar meus dados</CardTitle>
                        <CardDescription>
                            Gerencie os seus dados de cadastro
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Nome</Label>
                                    <Input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        placeholder="Seu nome"
                                        value={user?.nome}
                                        disabled={true}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="seu-email@examplo.com"
                                        value={user?.email}
                                        disabled={true}
                                    />
                                </div>
                                <h3 className="font-medium">Endereços</h3>
                                <div className="flex flex-col gap-2 text-sm">
                                    {user?.enderecos?.map((endereco) => (
                                        <div className="flex justify-between" key={endereco.id}>
                                            <span className="flex justfy-between items-center">
                                                {endereco.rua}, {endereco.numero}, {endereco.complemento}, {endereco.cidade}, {endereco.estado}, {endereco.cep}
                                            </span>
                                            <div className="flex">
                                                <Button onClick={() => atualizarEndereco(endereco)} className="cursor-pointer" variant="ghost" size="sm"><Pencil /></Button>
                                                <Button className="cursor-pointer" variant="ghost" size="sm"><Trash2 /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={cadastrarEndereco} className="w-full mt-1 cursor-pointer">
                                    Cadastrar Novo Endereço
                                </Button>

                                <h3 className="font-medium">Telefones</h3>
                                <div className="flex flex-col gap-2 text-sm">
                                    {user?.telefones?.map((telefone) => (
                                        <div className="flex justify-between" key={telefone.id}>
                                            <span>
                                                ({telefone.ddd}) {telefone.numero}
                                            </span>
                                            <div className="flex">
                                                <Button onClick={() => atualizarTelefone(telefone)} className="cursor-pointer" variant="ghost" size="sm"><Pencil /></Button>
                                                <Button className="cursor-pointer" variant="ghost" size="sm"><Trash2 /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button onClick={cadastrarTelefone} className="w-full mt-1 cursor-pointer">
                                    Cadastrar Novo Telefone
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
        </>

    )
}

