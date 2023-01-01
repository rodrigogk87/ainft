import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { GenerateImageDto } from './dtos/generate-image.dto';

@Injectable()
export class OpenaiService {

    private readonly openAIApi: OpenAIApi;

    constructor() {
        this.openAIApi = new OpenAIApi(new Configuration({ apiKey: "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" }));
    }

    async generateImage(generateImageDto: GenerateImageDto): Promise<string[]> {
        let prompt = `a legendary ${generateImageDto.class}, ${generateImageDto.eyes} eyes, ${generateImageDto.hair} hair, epic and abstract style`;
        console.log(prompt);
        const response = await this.openAIApi.createImage({
            prompt: prompt,
            n: 5,
            size: "1024x1024",
        });

        return response?.data?.data?.map(element => { return element.url });
    }
}