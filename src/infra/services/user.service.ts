import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserService } from "src/domain/services/user.service";
import { UserRepository } from "../database/user.repository";
import { IUserRepository } from "src/domain/database/user.repository";
import { InsertUserDto } from "src/app/dtos/user/insert.dto";
import { UpdatePublicKeyUserDto } from "src/app/dtos/user/update.public.key.dto";
import { InsertUserPresenter } from "src/app/presenters/user/insert.presenter";
import { FindByEmailUserPresenter } from "src/app/presenters/user/find.by.email.presenter";
import { UpdatePublicKeyUserPresenter } from "src/app/presenters/user/update.public.key.presenter";
import { UpdateNameUserDto } from "src/app/dtos/user/update.name.dto";
import { UpdateNameUserPresenter } from "src/app/presenters/user/update.name.presenter";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByEmail(email: string): Promise<FindByEmailUserPresenter> {
    const users = await this.userRepository.findByEmail(email)
    return new FindByEmailUserPresenter(users)
  }

  async insert(user: InsertUserDto): Promise<InsertUserPresenter> {
    try {
      const newUser = await this.userRepository.insert(user)
      return new InsertUserPresenter(newUser)
    } catch {
      throw new ConflictException("Email already in use")
    }
  }

  async updatePublicKey(data: UpdatePublicKeyUserDto): Promise<UpdatePublicKeyUserPresenter> {
    const user = await this.userRepository.updatePublicKey(data)
    return new UpdatePublicKeyUserPresenter(user)
  }

  async updateName(data: UpdateNameUserDto): Promise<UpdateNameUserPresenter> {
    const user = await this.userRepository.updateName(data)
    return new UpdateNameUserPresenter(user)
  }
}