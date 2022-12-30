import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly openaiService: OpenaiService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('image')
  getImage(): Promise<string> {
    return this.openaiService.getImage();
  }
}
