import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from "../services/mail.service";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
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
        })
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
