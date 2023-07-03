import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class ValidateResetTokenDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    token: string

    @IsString()
    @IsNotEmpty()
    publicKey: string
}
