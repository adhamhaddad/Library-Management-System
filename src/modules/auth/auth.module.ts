import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { User } from './entities/user.entity';
import { Utils } from 'src/utils/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';
import { jwtFactory } from './config/jwt.config';
import { AuthService } from './services/auth.service';
import { PasswordHash } from 'src/utils/password-hash';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync(jwtFactory),
    RedisModule,
  ],
  providers: [AuthService, User, PasswordHash, Utils],
  controllers: [AuthController],
  exports: [User, TypeOrmModule.forFeature([User]), AuthService, Utils],
})
export class AuthModule {}
