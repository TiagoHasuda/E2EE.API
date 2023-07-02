import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
import { FindOneEmailUserPresenter } from "src/app/presenters/user/find.one.email.presenter";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) { }

  async findByEmail(email: string): Promise<FindByEmailUserPresenter> {
    const users = await this.userRepository.findByEmail(email)
    return new FindByEmailUserPresenter(users)
  }

  async findOneEmail(email: string): Promise<FindOneEmailUserPresenter> {
    const user = await this.userRepository.findOneEmail(email);
    if (!user)
      throw new NotFoundException('User not found')
    return new FindOneEmailUserPresenter(user);
  }

  async insert(user: InsertUserDto): Promise<InsertUserPresenter> {
    const existingUser = await this.userRepository.findOneEmail(user.email)
    if (existingUser)
      throw new ConflictException("Email already in use")
    const newUser = await this.userRepository.insert(user)
    return new InsertUserPresenter(newUser)
  }

  async updatePublicKey(data: UpdatePublicKeyUserDto): Promise<UpdatePublicKeyUserPresenter> {
    const existingUser = await this.userRepository.findById(data.userId)
    if (!existingUser)
      throw new NotFoundException("User not found")
    const user = await this.userRepository.updatePublicKey(data)
    return new UpdatePublicKeyUserPresenter(user)
  }

  async updateName(data: UpdateNameUserDto): Promise<UpdateNameUserPresenter> {
    const existingUser = await this.userRepository.findById(data.userId)
    if (!existingUser)
      throw new NotFoundException("User not found")
    const user = await this.userRepository.updateName(data)
    return new UpdateNameUserPresenter(user)
  }
}