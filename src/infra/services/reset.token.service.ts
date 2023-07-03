import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { IResetTokenService } from "src/domain/services/reset.token.service";
import { ResetTokenRepository } from "../database/reset.token.repository";
import { IResetTokenRepository } from "src/domain/database/reset.token.repository";
import { UserRepository } from "../database/user.repository";
import { IUserRepository } from "src/domain/database/user.repository";
import { NewToken } from "../utils/new.token.util";
import { MailService } from "./mail.service";

@Injectable()
export class ResetTokenService implements IResetTokenService {
    constructor(
        @Inject(ResetTokenRepository)
        private readonly resetTokenRepository: IResetTokenRepository,
        @Inject(UserRepository)
        private readonly userRepository: IUserRepository,
        private readonly mailService: MailService,
    ) {}

    async sendResetToken(email: string): Promise<void> {
        const user = await this.userRepository.findOneEmail(email);
        if (!user)
            throw new NotFoundException('User not found');
        const newToken = NewToken();
        await this.resetTokenRepository.insertOrUpdate(user.id, newToken);
        const res = await this.mailService.sendResetToken(email, user.name, newToken.split('').join(' '));
        if (!res)
            throw new InternalServerErrorException('Couldn\'t send email');
    }
}
