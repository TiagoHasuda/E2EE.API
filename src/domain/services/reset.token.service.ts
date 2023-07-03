export interface IResetTokenService {
    sendResetToken(email: string): Promise<void>
}
