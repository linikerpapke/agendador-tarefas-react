import { jwtDecode } from "jwt-decode"
import type { UserResponse } from "./userService";

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'logged_user';

export const authService = {

    saveToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token)
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },

    isLoggedIn() {
        return !!this.getToken()
    },

    saveUser(user: UserResponse) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    getUser(): UserResponse | null {
        const user = localStorage.getItem(USER_KEY)
        if (!user) return null
        return JSON.parse(user)
    },

    removeUser() {
        localStorage.removeItem(USER_KEY)
    },

    getEmail(): string | null {
        const token = this.getToken()

        if (!token) return null

        try {
            const decoded = jwtDecode(token)
            return decoded?.sub || null
        } catch (error) {
            return null
        }
    },
}