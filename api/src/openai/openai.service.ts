import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { GenerateImageDto } from '../images/dtos/generate-image.dto';

@Injectable()
export class OpenaiService {

    private readonly openAIApi: OpenAIApi;

    constructor() {
        this.openAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.API_KEY }));
    }

    async generateImage(): Promise<any> {
        const attributes = this.getRandomAttributes();
        const prompt = `a legendary ${attributes.class}, ${attributes.eyes} eyes, ${attributes.hair} hair, epic and abstract style`;
        console.log(prompt);

        const response = await this.openAIApi.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
        });

        return { url: response?.data?.data[0]?.url, prompt: prompt, attributes: attributes };
    }


    getRandomAttributes(): any {
        const classes = [
            'orc',
            'troll',
            'angel',
            'fallen angel',
            'minotaur',
            'fenix'
        ];
        const eyes = [
            'blue',
            'red',
            'green',
            'yellow',
            'black'
        ]

        const hair = [
            'black',
            'red',
            'green',
            'blue',
            'white'
        ]

        const attributes = {
            class: classes[Math.floor(Math.random() * classes.length)],
            eyes: eyes[Math.floor(Math.random() * eyes.length)],
            hair: hair[Math.floor(Math.random() * hair.length)]
        };

        return attributes;

    }
}