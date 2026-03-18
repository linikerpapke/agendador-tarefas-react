const TOKEN_KEY = 'auth_token';

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
    }
}