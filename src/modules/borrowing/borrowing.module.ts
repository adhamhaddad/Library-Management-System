import { Module } from '@nestjs/common';
import { BorrowingService } from './services/borrowing.service';
import { BorrowingController } from './controllers/borrowing.controller';
import { AdminBorrowingsController } from '../admin/controllers/admin-borrowing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Utils } from 'src/utils/utils';
import { RedisService } from '../redis/redis.service';
import { Book } from '../book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing, Book])],
  providers: [BorrowingService, JwtStrategy, Utils, RedisService],
  controllers: [BorrowingController, AdminBorrowingsController],
})
export class BorrowingModule {}
