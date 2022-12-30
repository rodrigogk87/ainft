import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
