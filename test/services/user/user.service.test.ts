import { FindByEmailUserPresenter } from "src/app/presenters/user/find.by.email.presenter";
import { InsertUserPresenter } from "src/app/presenters/user/insert.presenter";
import { UpdateNameUserPresenter } from "src/app/presenters/user/update.name.presenter";
import { UpdatePublicKeyUserPresenter } from "src/app/presenters/user/update.public.key.presenter";
import { UserService } from "src/infra/services/user.service";
import { UserEntityMock } from "test/mocks/entities/user.entity.mock";
import { UserRepositoryMock } from "test/mocks/repositories/user.repository.mock";

describe('UserService', () => {
    let userRepository: UserRepositoryMock;

    let sut: UserService;

    const {
        findOneEmailMock,
        findByIdMock,
    } = UserRepositoryMock.getMocks();

    function initDependencies() {
        userRepository = new UserRepositoryMock();
    }

    function initSut() {
        sut = new UserService(userRepository);
    }

    function init() {
        initDependencies();
        initSut();
        jest.clearAllMocks();
    }

    beforeEach(init);

    it('should return the new user formatted by presenter on insert', () => {
        const newUser = UserEntityMock.createUser();
        findOneEmailMock.mockResolvedValueOnce(null);
        const promise = sut.insert(newUser);
        const expectedResult = new InsertUserPresenter(newUser);

        return expect(promise).resolves.toMatchObject(expectedResult);
    });

    it('should throw an error if the email is already in use on insert', () => {
        const emailInUse = 'emailinuse@email.com';
        const newUser = UserEntityMock.createUser({ email: emailInUse });
        findOneEmailMock.mockResolvedValueOnce(newUser);
        const payload = UserEntityMock.createUser({ email: emailInUse });
        const promise = sut.insert(payload);
        return expect(promise).rejects.toThrowError('Email already in use');
    });

    test('should return the users formatted by presenter on findByEmail', () => {
        const user = UserEntityMock.createUser({ email: 'testEmail@email.com' });
        const promise = sut.findByEmail(user.email);
        const expectedResult = new FindByEmailUserPresenter([user]);
        return expect(promise).resolves.toMatchObject(expectedResult);
    });

    it('should throw error if user doesn\'t exist on updatePublicKey', () => {
        const user = UserEntityMock.createUser();
        findByIdMock.mockResolvedValueOnce(null);
        const promise = sut.updatePublicKey({ userId: user.id, publicKey: 'newPublicKey' });
        return expect(promise).rejects.toThrowError('User not found');
    });

    it('should return formatted user with new public key by presenter on updatePublicKey', () => {
        const newPublicKey = 'newPublicKey';
        const user = UserEntityMock.createUser();
        const promise = sut.updatePublicKey({ userId: user.id, publicKey: newPublicKey });
        user.publicKey = newPublicKey;
        const expectedResult = new UpdatePublicKeyUserPresenter(user);
        return expect(promise).resolves.toMatchObject(expectedResult);
    });

    it('should throw error if user doesn\'t exist on updateName', () => {
        const user = UserEntityMock.createUser();
        findByIdMock.mockResolvedValueOnce(null);
        const promise = sut.updateName({ userId: user.id, name: 'newName' });
        return expect(promise).rejects.toThrowError('User not found');
    });

    it('should return formatted user with new name by presenter on updateName', () => {
        const newName = 'newName';
        const user = UserEntityMock.createUser();
        const promise = sut.updateName({ userId: user.id, name: newName });
        user.name = newName;
        const expectedResult = new UpdateNameUserPresenter(user);
        return expect(promise).resolves.toMatchObject(expectedResult);
    });
});
