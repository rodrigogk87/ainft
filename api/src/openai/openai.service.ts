import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenaiService {

    private readonly openAIApi: OpenAIApi;

    constructor() {
        this.openAIApi = new OpenAIApi(new Configuration({ apiKey: "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" }));
    }

    async generateImage(): Promise<string> {
        const response = await this.openAIApi.createImage({
            prompt: "an ogre with red skin and blue eyes and white hair",
            n: 1,
            size: "1024x1024",
        });
        return response?.data?.data[0]?.url;
    }
}
