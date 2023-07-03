import { MailService } from "src/infra/services/mail.service";
import { ResetTokenService } from "src/infra/services/reset.token.service";
import { UserEntityMock } from "test/mocks/entities/user.entity.mock";
import { ResetTokenRepositoryMock } from "test/mocks/repositories/reset.token.repository.mock";
import { UserRepositoryMock } from "test/mocks/repositories/user.repository.mock";
import { MailerServiceMock } from "test/mocks/services/mailer.service.mock";
import { mailerOptions } from "../mail.service.test";
import { ResetTokenEntityMock } from "test/mocks/entities/reset.token.entity.mock";
import { InsertUserPresenter } from "src/app/presenters/user/insert.presenter";
import { BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";

describe('ResetTokenService', () => {
    let userRepository: UserRepositoryMock;
    let resetTokenRepository: ResetTokenRepositoryMock;
    let mailService: MailService;

    let sut: ResetTokenService;

    const {
        findOneEmailMock,
        updatePublicKeyMock,
    } = UserRepositoryMock.getMocks();

    const {
        sendMailMock,
    } = MailerServiceMock.getMocks();

    const {
        getByUserMock,
        removeMock,
    } = ResetTokenRepositoryMock.getMocks();

    function initDependencies() {
        userRepository = new UserRepositoryMock();
        resetTokenRepository = new ResetTokenRepositoryMock();
        mailService = new MailService(new MailerServiceMock(mailerOptions, null));
    }

    function initSut() {
        sut = new ResetTokenService(resetTokenRepository, userRepository, mailService);
    }

    function init() {
        initDependencies();
        initSut();
        jest.clearAllMocks();
    }

    beforeEach(init);

    it('should throw error if user doesn\'t exist on sendResetToken', () => {
        const user = UserEntityMock.createUser();
        findOneEmailMock.mockResolvedValueOnce(null);
        const promise = sut.sendResetToken(user.email);
        return expect(promise).rejects.toThrowError(NotFoundException);
    });

    it('should throw error if mail service throws an error on sendResetToken', () => {
        const user = UserEntityMock.createUser();
        sendMailMock.mockRejectedValueOnce(null);
        const promise = sut.sendResetToken(user.email);
        return expect(promise).rejects.toThrowError(InternalServerErrorException);
    });

    it('should throw error if user doesn\'t exist on validateResetToken', () => {
        const user = UserEntityMock.createUser();
        findOneEmailMock.mockResolvedValueOnce(null);
        const promise = sut.validateResetToken(user.email, '123456', user.publicKey);
        return expect(promise).rejects.toThrowError(NotFoundException);
    });

    it('should throw error if there is no token to verify on validateResetToken', () => {
        const user = UserEntityMock.createUser();
        getByUserMock.mockResolvedValueOnce(null);
        const promise = sut.validateResetToken(user.email, '123456', user.publicKey);
        return expect(promise).rejects.toThrowError(BadRequestException);
    });

    it('should throw error if the token is invalid on validateResetToken', () => {
        const resetToken = ResetTokenEntityMock.createResetToken();
        const promise = sut.validateResetToken(resetToken.user.email, 'abcdef', resetToken.user.publicKey);
        return expect(promise).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw error if token is not removed from db on validateResetToken', () => {
        const resetToken = ResetTokenEntityMock.createResetToken();
        getByUserMock.mockResolvedValueOnce(resetToken);
        removeMock.mockResolvedValueOnce(false);
        const promise = sut.validateResetToken(resetToken.user.email, resetToken.token, resetToken.user.publicKey);
        return expect(promise).rejects.toThrowError(BadRequestException);
    });

    it('should return formatted user by presenter on validateResetToken', () => {
        const resetToken = ResetTokenEntityMock.createResetToken();
        getByUserMock.mockResolvedValueOnce(resetToken);
        updatePublicKeyMock.mockResolvedValueOnce(resetToken.user);
        const promise = sut.validateResetToken(resetToken.user.email, resetToken.token, resetToken.user.publicKey);
        const expectedResult = new InsertUserPresenter(resetToken.user);
        return expect(promise).resolves.toMatchObject(expectedResult);
    });
})
