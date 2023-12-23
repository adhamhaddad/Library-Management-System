import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerService } from './services/borrower.service';
import { BorrowerController } from './controllers/borrower.controller';
import { AdminBorrowerController } from '../admin/controllers/admin-borrower.controller';
import { User } from '../auth/entities/user.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Utils } from 'src/utils/utils';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [BorrowerService, JwtStrategy, Utils, RedisService],
  controllers: [BorrowerController, AdminBorrowerController],
})
export class BorrowerModule {}
