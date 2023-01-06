import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) { }

  @Get('generate-metadata')
  async getMetadata(): Promise<any> {
    return await this.metadataService.generateMetadata();
  }
}
