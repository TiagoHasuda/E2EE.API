import { IsString, IsNotEmpty } from "class-validator";

export class UpdatePublicKeyUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  publicKey: string
}