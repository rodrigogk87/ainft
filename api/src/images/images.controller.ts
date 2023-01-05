import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateImageDto } from 'src/images/dtos/generate-image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Get('generate-metadata')
  async getMetadata(): Promise<any> {
    return await this.imagesService.generateMetadata();
  }
}
