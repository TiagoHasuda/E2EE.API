import { MailService } from "src/infra/services/mail.service";
import { ResetTokenService } from "src/infra/services/reset.token.service";
import { UserEntityMock } from "test/mocks/entities/user.entity.mock";
import { ResetTokenRepositoryMock } from "test/mocks/repositories/reset.token.repository.mock";
import { UserRepositoryMock } from "test/mocks/repositories/user.repository.mock";
import { MailerServiceMock } from "test/mocks/services/mailer.service.mock";
import { mailerOptions } from "../mail.service.test";

describe('ResetTokenService', () => {
    let userRepository: UserRepositoryMock;
    let resetTokenRepository: ResetTokenRepositoryMock;
    let mailService: MailService;

    let sut: ResetTokenService;

    const {
        findOneEmailMock,
    } = UserRepositoryMock.getMocks();

    const {
        sendMailMock,
    } = MailerServiceMock.getMocks();

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
        return expect(promise).rejects.toThrowError('User not found');
    });

    it('should throw error if mail service throws an error on sendResetToken', () => {
        const user = UserEntityMock.createUser();
        sendMailMock.mockRejectedValueOnce(null);
        const promise = sut.sendResetToken(user.email);
        return expect(promise).rejects.toThrowError('Couldn\'t send email');
    });
})