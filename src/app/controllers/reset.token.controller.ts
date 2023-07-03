import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IResetTokenService } from "src/domain/services/reset.token.service";
import { ResetTokenService } from "src/infra/services/reset.token.service";
import { SendResetTokenDto } from "../dtos/resetToken/send.dto";
import { ValidateResetTokenDto } from "../dtos/resetToken/validate.dto";
import { InsertUserPresenter } from "../presenters/user/insert.presenter";

@Controller('resetToken')
export class ResetTokenController {
    constructor(
        @Inject(ResetTokenService)
        private readonly resetTokenService: IResetTokenService,
    ) {}

    @Post('send')
    sendResetToken(
        @Body() { email }: SendResetTokenDto,
    ): Promise<void> {
        return this.resetTokenService.sendResetToken(email);
    };

    @Post('validate')
    validateToken(
        @Body() { email, token, publicKey }: ValidateResetTokenDto,
    ): Promise<InsertUserPresenter> {
        return this.resetTokenService.validateResetToken(email, token, publicKey);
    }
}
