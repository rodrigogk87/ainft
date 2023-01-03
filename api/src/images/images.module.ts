import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [IpfsModule, OpenaiModule],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
