import { InsertUserPresenter } from "src/app/presenters/user/insert.presenter";
import { User } from "../entities/user.entity";

export interface IResetTokenService {
    sendResetToken(email: string): Promise<void>;
    validateResetToken(email: string, token: string, publicKey: string): Promise<InsertUserPresenter>;
}
