import { Module } from "@nestjs/common";
import { ResetTokenController } from "src/app/controllers/reset.token.controller";
import { ResetTokenService } from "../services/reset.token.service";
import { MailModule } from "./mail.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResetToken } from "src/domain/entities/reset.token.entity";
import { User } from "src/domain/entities/user.entity";
import { ResetTokenRepository } from "../database/reset.token.repository";
import { UserRepository } from "../database/user.repository";

@Module({
    imports: [
        MailModule,
        TypeOrmModule.forFeature([ResetToken, User]),
    ],
    providers: [ResetTokenService, ResetTokenRepository, UserRepository],
    controllers: [ResetTokenController],
    exports: [ResetTokenService],
})
export class ResetTokenModule {}
