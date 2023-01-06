import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { ATTRIBUTES } from 'src/constants/attributes.const';
import IAttributes from 'src/interfaces/IAttributes.interface';
@Injectable()
export class OpenaiService {

    private readonly openAIApi: OpenAIApi;

    constructor() {
        this.openAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.API_KEY }));
    }

    async generateImage(): Promise<any> {
        const attributes = this.getRandomAttributes();
        const prompt = `a legendary ${attributes.title} ${attributes.class} with ${attributes.eyes} eyes and ${attributes.hair} hair with an epic and abstract style`;
        console.log(prompt);

        const response = await this.openAIApi.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
        });

        return { url: response?.data?.data[0]?.url, prompt: prompt, attributes: attributes };
    }


    getRandomAttributes(): IAttributes {

        const attributes = {
            class: ATTRIBUTES.classes[Math.floor(Math.random() * ATTRIBUTES.classes.length)],
            eyes: ATTRIBUTES.eyes[Math.floor(Math.random() * ATTRIBUTES.eyes.length)],
            hair: ATTRIBUTES.hair[Math.floor(Math.random() * ATTRIBUTES.hair.length)],
            title: ATTRIBUTES.title[Math.floor(Math.random() * ATTRIBUTES.title.length)],
        };

        return attributes;

    }
}