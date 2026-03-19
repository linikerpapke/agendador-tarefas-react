import { authService } from "@/services/authService"
import type { UserResponse } from "@/services/userService"
import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"

type Props = {
    children: React.ReactNode
}

export function UserProvider({ children }: Props) {
    const [user, setUser] = useState<UserResponse | null>(null)

    useEffect(() => {
        const storedUser = authService.getUser();
        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}