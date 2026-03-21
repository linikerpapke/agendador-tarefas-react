import { authService } from "@/services/authService"
import { userService, type UserResponse } from "@/services/userService"
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

    async function refreshUser() {
        const updatedUser = await userService.getUserByEmail()

        setUser(updatedUser)
        authService.saveUser(updatedUser)
    }

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    )
}