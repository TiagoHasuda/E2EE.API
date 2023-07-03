import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";

export class MailerServiceMock extends MailerService {
    sendMail(sendMailOptions: ISendMailOptions): Promise<any> {
        return Promise.resolve(true);
    }

    static getMocks() {
        return {
            sendMailMock: jest.spyOn(
                MailerServiceMock.prototype,
                'sendMail',
            ),
        };
    }
}
