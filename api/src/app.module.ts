import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { ImagesService } from './images/images.service';
import { IpfsModule } from './ipfs/ipfs.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [IpfsModule, OpenaiModule, ImagesModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ImagesService],
})
export class AppModule { }
