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
import {
    BadgeCheckIcon,
    LogOutIcon,
} from "lucide-react"
import { useNavigate } from "react-router"

export function HeaderDropDownMenu() {

    const navigate = useNavigate()
    const { logout } = useAuth()

    function handleLogout() {
        logout()
        navigate("/login")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full">
                    <Avatar>
                        <AvatarImage src="" alt="shadcn" />
                        <AvatarFallback className="bg-blue-200">U</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
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
