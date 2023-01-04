import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { OpenaiModule } from 'src/openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/images.schema';

@Module({
  imports: [IpfsModule, OpenaiModule, MongooseModule.forFeature([{ name: "Image", schema: ImageSchema }])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
