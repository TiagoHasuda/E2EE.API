import { InsertUserDto } from "src/app/dtos/user/insert.dto";
import { UpdateNameUserDto } from "src/app/dtos/user/update.name.dto";
import { UpdatePublicKeyUserDto } from "src/app/dtos/user/update.public.key.dto";
import { IUserRepository } from "src/domain/database/user.repository";
import { User } from "src/domain/entities/user.entity";
import { UserEntityMock } from "../entities/user.entity.mock";

export class UserRepositoryMock implements IUserRepository {
    findByEmail(email: string): Promise<User[]> {
        return Promise.resolve([UserEntityMock.createUser({ email })]);
    }

    findOneEmail(email: string): Promise<User> {
        return Promise.resolve(UserEntityMock.createUser({ email }));
    }

    findById(id: string): Promise<User> {
        return Promise.resolve(UserEntityMock.createUser({ id }));
    }

    insert(newUser: InsertUserDto): Promise<User> {
        return Promise.resolve(UserEntityMock.createUser(newUser));
    }

    updatePublicKey(data: UpdatePublicKeyUserDto): Promise<User> {
        return Promise.resolve(UserEntityMock.createUser({ id: data.userId, publicKey: data.publicKey }));
    }

    updateName(data: UpdateNameUserDto): Promise<User> {
        return Promise.resolve(UserEntityMock.createUser({ id: data.userId, name: data.name }));
    }

    static getMocks() {
        return {
            findByEmailMock: jest.spyOn(
                UserRepositoryMock.prototype,
                'findByEmail',
            ),
            findOneEmailMock: jest.spyOn(
                UserRepositoryMock.prototype,
                'findOneEmail',
            ),
            findByIdMock: jest.spyOn(
                UserRepositoryMock.prototype,
                'findById',
            ),
            insertMock: jest.spyOn(
                UserRepositoryMock.prototype,
                'insert',
            ),
            updatePublicKeyMock: jest.spyOn(
                UserRepositoryMock.prototype,
                'updatePublicKey',
            ),
            updateNameMock: jest.spyOn(
                UserRepositoryMock.prototype,
                'updateName',
            ),
        };
    }
}
