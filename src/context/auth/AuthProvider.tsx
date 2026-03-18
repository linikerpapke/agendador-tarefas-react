import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type Props = {
    children: React.ReactNode
}

export function AuthProvider({ children }: Props) {

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        setIsLogged(authService.isLoggedIn())
    }, [])

    function login(token: string) {
        authService.saveToken(token);
        setIsLogged(true)
    }

    function logout() {
        authService.removeToken();
        setIsLogged(false)
    }

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}