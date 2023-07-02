import { ResetToken } from "../entities/reset.token.entity";

export interface IResetTokenRepository {
  getByUser(userId: string): Promise<ResetToken>
  insertOrUpdate(userId: string, token: string): Promise<ResetToken>
  remove(userId: string): Promise<boolean>
}