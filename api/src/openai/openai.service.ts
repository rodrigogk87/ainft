import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { GenerateImageDto } from '../images/dtos/generate-image.dto';

@Injectable()
export class OpenaiService {

    private readonly openAIApi: OpenAIApi;

    constructor() {
        this.openAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.API_KEY }));
    }

    async generateImages(generateImageDto: GenerateImageDto): Promise<string[]> {
        let prompt = `a legendary ${generateImageDto.class}, ${generateImageDto.eyes} eyes, ${generateImageDto.hair} hair, epic and abstract style`;

        const response = await this.openAIApi.createImage({
            prompt: prompt,
            n: generateImageDto.numberOfImages,
            size: "1024x1024",
        });

        return response?.data?.data?.map(element => { return element.url });
    }
}