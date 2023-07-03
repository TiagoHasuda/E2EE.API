import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { MailService } from "src/infra/services/mail.service";
import { NewToken } from "src/infra/utils/new.token.util";
import { UserEntityMock } from "test/mocks/entities/user.entity.mock";
import { MailerServiceMock } from "test/mocks/services/mailer.service.mock";

export const mailerOptions = {
    transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    },
    defaults: {
        from: '"No Reply" <tiago.ghasuda@gmail.com>',
    },
    template: {
        dir: join(__dirname, '../../../app/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    }
};

describe('MailService', () => {
    let mailerService: MailerServiceMock;

    let sut: MailService;

    const {
        sendMailMock,
    } = MailerServiceMock.getMocks();

    function initDependencies() {
        mailerService = new MailerServiceMock(mailerOptions, null);
    }

    function initSut() {
        sut = new MailService(mailerService);
    }

    function init() {
        initDependencies();
        initSut();
        jest.clearAllMocks();
    }

    beforeEach(init);

    it('should return true if email is sent successfully on sendResetToken', () => {
        const user = UserEntityMock.createUser();
        const token = NewToken();
        const promise = sut.sendResetToken(user.email, user.name, token);
        return expect(promise).resolves.toBe(true);
    });

    it('should return false if email is not sent successfully on sendResetToken', () => {
        const user = UserEntityMock.createUser();
        const token = NewToken();
        sendMailMock.mockRejectedValueOnce(null);
        const promise = sut.sendResetToken(user.email, user.name, token);
        return expect(promise).resolves.toBe(false);
    });
});