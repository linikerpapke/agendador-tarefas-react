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
import { useAuth } from "@/context/auth/useAuth"
import { authService } from "@/services/authService"
import { useUser } from "@/context/user/useUser"

export function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const { setUser } = useUser();

    const [dadosFormulario, setDadosFormulario] = useState({
        email: "",
        senha: "",
    })
    const [errors, setErros] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const loginSchema = z.object({
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
        const result = loginSchema.safeParse({
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

        const result = loginSchema.safeParse(dadosFormulario)

        if (!result.success) {
            const fieldErros: Record<string, string> = {}

            result.error.issues.forEach(issue => {
                const field = issue.path[0] as string
                fieldErros[field] = issue.message
            })

            setErros(fieldErros)

            return
        }

        handleToast("Entrando")

        try {
            setIsLoading(true)
            const response = await userService.login(dadosFormulario);
            const token = response
            login(token)
            const user = await userService.getUserByEmail()
            authService.saveUser(user)
            setUser(user)
            navigate("/tasks")
        } catch (error) {
            handleToast(`Erro ao entrar na aplicação`)
            console.error("Erro ao entrar na aplicação usuario", error)
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
                        Preencha os dados abaixo para entrar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
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
                                {isLoading ? (<span className="flex items-center justify-center gap-2"> Entrando <Spinner /></span>) : "Entrar"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

