import { User } from "src/domain/entities/user.entity";
import { newUuidV4 } from "test/helpers/uuid.helper";

export class UserEntityMock {
    static createUser(params?: Partial<User>): User {
        return {
            id: newUuidV4(),
            email: 'test@test.com',
            name: 'Test User',
            publicKey: 'testKey',
            registrationToken: 'rt',
            tokens: [],
            ...params,
        }
    }
}
