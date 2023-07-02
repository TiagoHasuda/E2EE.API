import { IsString, IsNotEmpty } from "class-validator";

export class InsertUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  publicKey: string
}