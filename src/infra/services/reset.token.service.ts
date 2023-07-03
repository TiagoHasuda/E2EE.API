import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { IResetTokenService } from "src/domain/services/reset.token.service";
import { ResetTokenRepository } from "../database/reset.token.repository";
import { IResetTokenRepository } from "src/domain/database/reset.token.repository";
import { UserRepository } from "../database/user.repository";
import { IUserRepository } from "src/domain/database/user.repository";
import { NewToken } from "../utils/new.token.util";
import { MailService } from "./mail.service";
import { InsertUserPresenter } from "src/app/presenters/user/insert.presenter";

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

    async validateResetToken(email: string, token: string, publicKey: string): Promise<InsertUserPresenter> {
        const user = await this.userRepository.findOneEmail(email);
        if (!user)
            throw new NotFoundException('User not found');
        const currToken = await this.resetTokenRepository.getByUser(user.id);
        if (!currToken)
            throw new BadRequestException('No reset token to verify');
        if (currToken.token !== token)
            throw new UnauthorizedException('Invalid token');
        const res = await this.resetTokenRepository.remove(user.id);
        if (!res)
            throw new BadRequestException('No reset token to verify');
        const newUser = await this.userRepository.updatePublicKey({
            userId: user.id,
            publicKey,
        });
        return new InsertUserPresenter(newUser);
    }
}
