import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [AppController],
  providers: [AppService, OpenaiService],
})
export class AppModule { }
