import { InsertUserDto } from "src/app/dtos/user/insert.dto";
import { User } from "../entities/user.entity";
import { UpdatePublicKeyUserDto } from "src/app/dtos/user/update.public.key.dto";
import { InsertUserPresenter } from "src/app/presenters/user/insert.presenter";
import { FindByEmailUserPresenter } from "src/app/presenters/user/find.by.email.presenter";
import { UpdatePublicKeyUserPresenter } from "src/app/presenters/user/update.public.key.presenter";
import { UpdateNameUserDto } from "src/app/dtos/user/update.name.dto";
import { UpdateNameUserPresenter } from "src/app/presenters/user/update.name.presenter";

export interface IUserService {
  findByEmail(email: string): Promise<FindByEmailUserPresenter>
  insert(user: InsertUserDto): Promise<InsertUserPresenter>
  updatePublicKey(data: UpdatePublicKeyUserDto): Promise<UpdatePublicKeyUserPresenter>
  updateName(data: UpdateNameUserDto): Promise<UpdateNameUserPresenter>
}