import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [IpfsModule,
    OpenaiModule,
    ImagesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_PATH)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
