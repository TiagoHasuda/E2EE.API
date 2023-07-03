import { IResetTokenRepository } from "src/domain/database/reset.token.repository";
import { ResetToken } from "src/domain/entities/reset.token.entity";
import { ResetTokenEntityMock } from "../entities/reset.token.entity.mock";
import { UserEntityMock } from "../entities/user.entity.mock";

export class ResetTokenRepositoryMock implements IResetTokenRepository {
    getByUser(userId: string): Promise<ResetToken> {
        const user = UserEntityMock.createUser({ id: userId });
        return Promise.resolve(ResetTokenEntityMock.createResetToken({ user }));
    }

    insertOrUpdate(userId: string, token: string): Promise<ResetToken> {
        const user = UserEntityMock.createUser({ id: userId });
        return Promise.resolve(ResetTokenEntityMock.createResetToken({ user, token }));
    }

    remove(userId: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    static getMocks() {
        return {
            getByUserMock: jest.spyOn(
                ResetTokenRepositoryMock.prototype,
                'getByUser',
            ),
            insertOrUpdateMock: jest.spyOn(
                ResetTokenRepositoryMock.prototype,
                'insertOrUpdate',
            ),
            removeMock: jest.spyOn(
                ResetTokenRepositoryMock.prototype,
                'remove',
            ),
        };
    }
}
