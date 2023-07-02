import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Like } from 'typeorm'
import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/database/user.repository";
import { InsertUserDto } from "src/app/dtos/user/insert.dto";
import { UpdatePublicKeyUserDto } from "src/app/dtos/user/update.public.key.dto";
import { UpdateNameUserDto } from "src/app/dtos/user/update.name.dto";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User[]> {
    if (email.trim().length < 5) return []
    return this.userRepository.find({
      where: {
        email: Like(`%${email}%`),
      },
      take: 5,
    })
  }

  findOneEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  async insert(newUser: InsertUserDto): Promise<User> {
    await this.userRepository.insert(newUser);
    return this.userRepository.findOne({
      where: {
        email: newUser.email,
      },
    });
  }

  async updatePublicKey(data: UpdatePublicKeyUserDto): Promise<User> {
    await this.userRepository.update({
      id: data.userId,
    }, {
      publicKey: data.publicKey,
    });
    return this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });
  }

  async updateName(data: UpdateNameUserDto): Promise<User> {
    await this.userRepository.update({
      id: data.userId,
    }, {
      name: data.name,
    });
    return this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });
  }
}