import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { userService } from "@/services/userService"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { z } from "zod";
import { toast } from "sonner"

export function Register() {

    const navigate = useNavigate();

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: "",
        email: "",
        senha: "",
    })
    const [errors, setErros] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const registerSchema = z.object({
        nome: z.string().min(3, "Nome deve ter pelo menos 3 letras"),
        email: z.email("informe um e-mail válido"),
        senha: z.string().min(6, "A senha deve contar pelo menos 6 caracteres"),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setDadosFormulario((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const validateField = (name: string, value: string) => {
        const result = registerSchema.safeParse({
            ...dadosFormulario,
            [name]: value
        })

        if (!result.success) {
            const issue = result.error.issues.find(
                (issue) => issue.path[0] === name
            )

            setErros((prev) => ({
                ...prev,
                [name]: issue?.message || ""
            }))
        }
        else {
            setErros((prev) => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        validateField(name, value)
    }

    const handleToast = (text: string) => {
        
        toast(text, { position: "bottom-center" })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = registerSchema.safeParse(dadosFormulario)

        if (!result.success) {
            const fieldErros: Record<string, string> = {}

            result.error.issues.forEach(issue => {
                const field = issue.path[0] as string
                fieldErros[field] = issue.message
            })

            setErros(fieldErros)

            return
        }

        handleToast("Registrando usuário")

        try {
            setIsLoading(true)
            await userService.register(dadosFormulario);
            navigate("/login")
        } catch (error) {
            handleToast(`Erro ao registrar usuário: ${error}`)
            console.error("Erro ao registrar usuario", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center p-10">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Criar conta</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para se registrar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Nome</Label>
                                <Input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    placeholder="Digite seu nome"
                                    value={dadosFormulario.nome}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.nome}
                                    disabled={isLoading}
                                />
                                {errors.nome && (
                                    <FieldError>{errors.nome}</FieldError>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu-email@examplo.com"
                                    value={dadosFormulario.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.email}
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <FieldError>{errors.email}</FieldError>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                                <InputGroup>
                                    <InputGroupInput
                                        id="password"
                                        name="senha"
                                        type={showPassword ? "text" : "password"}
                                        value={dadosFormulario.senha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={!!errors.senha}
                                        disabled={isLoading}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Eye /> : <EyeClosed />}
                                        </button>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.senha && (
                                    <FieldError>{errors.senha}</FieldError>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (<span className="flex items-center justify-center gap-2"> Registrando <Spinner /></span>) : "Registrar"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

