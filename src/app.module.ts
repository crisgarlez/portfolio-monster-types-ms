import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MonsterTypesModule } from './monster-types/monster-types.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { enviroments } from './config/environments';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    MonsterTypesModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validationSchema: Joi.object({
        APP_VERSION: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
