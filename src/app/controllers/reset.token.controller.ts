import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IResetTokenService } from "src/domain/services/reset.token.service";
import { ResetTokenService } from "src/infra/services/reset.token.service";
import { SendResetTokenDto } from "../dtos/resetToken/send.dto";

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
}
