import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth/useAuth"
import { useUser } from "@/context/user/useUser"
import {
    BadgeCheckIcon,
    LogOutIcon,
} from "lucide-react"
import { useNavigate } from "react-router"

export function HeaderDropDownMenu() {

    const navigate = useNavigate()
    const { logout } = useAuth()
    const { user } = useUser()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    function getInitial(nome?: string) {
        return nome ? nome[0].toUpperCase() : "U"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full">
                    <Avatar>
                        <AvatarImage src="" alt="shadcn" />
                        <AvatarFallback className="bg-blue-200">{getInitial(user?.nome)}</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/user-data")}>
                        <BadgeCheckIcon />
                        Meus Dados
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
