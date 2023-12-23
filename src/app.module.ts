import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, appConfig, config } from './config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';

import { AdminModule } from './modules/admin/admin.module';
import { BorrowerModule } from './modules/borrower/borrower.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, config],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    //Localization
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        en: 'en',
        ar: 'ar',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        includeSubfolders: true,
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ScheduleModule.forRoot(),
    RedisModule,
    AuthModule,
    AdminModule,
    BorrowerModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer): void {
    if (this.configService.get('app.nodeEnv') == 'development') {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
}
