import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ConsumersModule } from './consumers/consumers.module';
import { HttpErrorFilter } from './common/pipes/http-error.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrationsTableName: configService.get('DB_MIGRATIONS_TABLE_NAME'),
        migrations: [__dirname + 'modules/database/migrations/*.{js,ts}'],
        seeds: [__dirname + 'modules/database/seeds/*{.ts,.js}'],
        migrationsDir: [__dirname + 'modules/database/migrations'],
        synchronize: configService.get('DB_SYNC'),
        autoLoadEntities: configService.get('DB_AUTOLOADENTITIES'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ConsumersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule { }
