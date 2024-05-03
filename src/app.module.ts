import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { InstitutionModule } from './institution/institution.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    //PassportModule.register({defaultStrategy: 'jwt'}),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,//sets to false on production
      autoLoadEntities: true,
      logging: [
        'info',
        'error',
        'migration'
      ],
      timezone: 'Z',
      //dateStrings: true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true
    }),
    UserModule,
    InstitutionModule,
    AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  
