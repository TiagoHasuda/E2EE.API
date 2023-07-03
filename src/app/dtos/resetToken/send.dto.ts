import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendResetTokenDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}
