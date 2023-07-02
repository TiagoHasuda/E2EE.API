import { IsNotEmpty, IsString } from "class-validator";

export class UpdateNameUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  name: string
}