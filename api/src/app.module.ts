import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataModule } from './metadata/metadata.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [IpfsModule,
    OpenaiModule,
    MetadataModule,
    ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
