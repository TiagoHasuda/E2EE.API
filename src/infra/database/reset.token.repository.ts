import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IResetTokenRepository } from "src/domain/database/reset.token.repository";
import { ResetToken } from "src/domain/entities/reset.token.entity";
import { Repository } from "typeorm";

@Injectable()
export class ResetTokenRepository implements IResetTokenRepository {
  constructor(
    @InjectRepository(ResetToken)
    private readonly resetTokenRepository: Repository<ResetToken>,
  ) {}

  getByUser(userId: string): Promise<ResetToken> {
    return this.resetTokenRepository.findOne({ where: { userId } })
  }

  insertOrUpdate(userId: string, token: string): Promise<ResetToken> {
    return this.resetTokenRepository.save({ userId, token })
  }

  async remove(userId: string): Promise<boolean> {
    const deleted = await this.resetTokenRepository.delete({ userId })
    return deleted.affected > 0
  }
}