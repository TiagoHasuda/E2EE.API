import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class InsertUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  publicKey: string
}