import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { IMailSerivce } from "src/domain/services/mail.service";

@Injectable()
export class MailService implements IMailSerivce {
    constructor(
        readonly mailerService: MailerService,
    ) { }

    async sendResetToken(email: string, name: string, token: string): Promise<boolean> {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Reset Token',
                template: './reset.token.hbs',
                context: {
                    name,
                    token,
                },
            });
            return true;
        } catch (err) {
            console.error('Reset token email not sent', err);
            return false;
        }
    }
}
