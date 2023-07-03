import { ResetToken } from "src/domain/entities/reset.token.entity";
import { NewToken } from "src/infra/utils/new.token.util";
import { UserEntityMock } from "./user.entity.mock";

export class ResetTokenEntityMock {
    static createResetToken(params?: Partial<ResetToken>): ResetToken {
        const user = UserEntityMock.createUser(params.user);
        return {
            token: NewToken(),
            userId: user.id,
            user,
            ...params,
        }
    }
}
