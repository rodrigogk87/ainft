import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [IpfsModule, OpenaiModule],
  controllers: [MetadataController],
  providers: [MetadataService]
})
export class MetadataModule { }
