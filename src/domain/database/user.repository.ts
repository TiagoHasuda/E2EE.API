import { InsertUserDto } from "src/app/dtos/user/insert.dto";
import { User } from "../entities/user.entity";
import { UpdatePublicKeyUserDto } from "src/app/dtos/user/update.public.key.dto";
import { UpdateNameUserDto } from "src/app/dtos/user/update.name.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<User[]>
  findOneEmail(email: string): Promise<User | null>
  insert(newUser: InsertUserDto): Promise<User>
  updatePublicKey(data: UpdatePublicKeyUserDto): Promise<User>
  updateName(data: UpdateNameUserDto): Promise<User>
}