import { Body, Controller, Post } from '@nestjs/common';
import { GenerateImageDto } from 'src/images/dtos/generate-image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post('generate-images')
  async getImage(@Body() generateImageDto: GenerateImageDto): Promise<any> {
    //should save them on ipfs and return hash (maybe another module like generateImage module)
    const images = await this.imagesService.generateImages(generateImageDto);
    return images;
  }
}
