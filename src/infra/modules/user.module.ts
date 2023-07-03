import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/app/controllers/user.controller";
import { User } from "src/domain/entities/user.entity";
import { UserService } from "../services/user.service";
import { UserRepository } from "../database/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}