import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { GenerateImageDto } from './dtos/generate-image.dto';

@Injectable()
export class OpenaiService {

    private readonly openAIApi: OpenAIApi;

    constructor() {
        this.openAIApi = new OpenAIApi(new Configuration({ apiKey: "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" }));
    }

    async generateImage(generateImageDto: GenerateImageDto): Promise<string> {
        const response = await this.openAIApi.createImage({
            prompt: `a ${generateImageDto.color} ${generateImageDto.class} that has ${generateImageDto.eyes} eyes and ${generateImageDto.hair} hair`,
            n: 1,
            size: "1024x1024",
        });
        return response?.data?.data[0]?.url;
    }
}