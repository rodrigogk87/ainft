import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { OpenaiService } from 'src/openai/openai.service';
import { GenerateImageDto } from './dtos/generate-image.dto';

@Injectable()
export class ImagesService {

    @Inject(OpenaiService)
    private readonly openAiService: OpenaiService;
    @Inject(IpfsService)
    private readonly IPFSServvice: IpfsService;


    async generateImages(generateImageDto: GenerateImageDto): Promise<any[]> {
        //generate images
        const prompt = `a legendary ${generateImageDto.class}, ${generateImageDto.eyes} eyes, ${generateImageDto.hair} hair, epic and abstract style`;

        const imageUrl = await this.openAiService.generateImage(generateImageDto);

        //store them on ipfs
        //let hashes = await response?.map(async element => { return await this.storeImage(element) });

        let hash = await this.storeImage(imageUrl);

        return hash;
    }

    async storeImage(url: string) {
        console.log(url);
        let cid = await this.IPFSServvice.upload(url);
        console.log(cid);
        return cid;
    }

}
