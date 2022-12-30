import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenaiService {
    openai = new OpenAIApi(new Configuration({ apiKey: "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" }));

    async getImage(): Promise<string> {
        const response = await this.openai.createImage({
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
        });
        return response.data.data[0].url;
    }
}
