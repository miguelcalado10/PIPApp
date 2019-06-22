export interface AuthResponse {
    response: {
        email_exists: boolean,
        message: string,
        jwt: string
    }
}