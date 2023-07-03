export interface IMailSerivce {
    sendResetToken(email: string, name: string, token: string): Promise<boolean>;
}
