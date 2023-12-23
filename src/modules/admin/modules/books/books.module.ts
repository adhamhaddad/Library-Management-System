import { Module } from '@nestjs/common';
import { BookService } from './services/book.service';
import { BooksController } from './controllers/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { Utils } from 'src/utils/utils';
import { RedisService } from 'src/modules/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, JwtStrategy, Utils, RedisService],
  controllers: [BooksController],
})
export class BooksModule {}
