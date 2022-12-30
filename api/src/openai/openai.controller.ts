import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateImageDto } from './dtos/generate-image.dto';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) { }

  @Post('generate-image')
  getImage(@Body() generateImageDto: GenerateImageDto): Promise<string> {
    return this.openaiService.generateImage(generateImageDto);
  }
}
