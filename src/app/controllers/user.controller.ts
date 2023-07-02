import { Controller, Get, Query, Patch, Post, Body, Inject } from "@nestjs/common";
import { IUserService } from "src/domain/services/user.service";
import { UserService } from "src/infra/services/user.service";
import { InsertUserDto } from "../dtos/user/insert.dto";
import { UpdatePublicKeyUserDto } from "../dtos/user/update.public.key.dto";
import { InsertUserPresenter } from "../presenters/user/insert.presenter";
import { FindByEmailUserPresenter } from "../presenters/user/find.by.email.presenter";
import { UpdatePublicKeyUserPresenter } from "../presenters/user/update.public.key.presenter";
import { UpdateNameUserDto } from "../dtos/user/update.name.dto";
import { UpdateNameUserPresenter } from "../presenters/user/update.name.presenter";
import { FindOneEmailUserPresenter } from "../presenters/user/find.one.email.presenter";

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: IUserService,
  ) {}

  @Get()
  findByEmail(
    @Query('email') email: string,
  ): Promise<FindByEmailUserPresenter> {
    return this.userService.findByEmail(email)
  }

  @Get('one')
  findOneEmail(
    @Query('email') email: string,
  ): Promise<FindOneEmailUserPresenter> {
    return this.userService.findOneEmail(email)
  }

  @Post()
  insert(
    @Body() user: InsertUserDto,
  ): Promise<InsertUserPresenter> {
    return this.userService.insert(user)
  }

  @Patch('publicKey')
  updatePublicKey(
    @Body() data: UpdatePublicKeyUserDto,
  ): Promise<UpdatePublicKeyUserPresenter> {
    return this.userService.updatePublicKey(data)
  }

  @Patch('name')
  updateName(
    @Body() data: UpdateNameUserDto,
  ): Promise<UpdateNameUserPresenter> {
    return this.userService.updateName(data)
  }
}