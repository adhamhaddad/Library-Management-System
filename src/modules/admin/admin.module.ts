import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/entities/user.entity';
import { AuthService } from '../auth/services/auth.service';
import { Utils } from 'src/utils/utils';
import { RedisModule } from '../redis/redis.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { jwtFactory } from '../auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthModule]),
    JwtModule.registerAsync(jwtFactory),
    RedisModule,
  ],
  exports: [TypeOrmModule.forFeature([AuthModule])],
  providers: [AuthService, JwtStrategy, Utils, RedisService],
  controllers: [],
})
export class AdminModule {}
