import { Inject, Injectable } from '@nestjs/common';
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

        //const response = await this.openAiService.generateImages(generateImageDto);

        //store them on ipfs
        //let hashes = await response?.map(async element => { return await this.storeImage(element) });

        let hashes = await this.storeImage(prompt);

        return hashes;
    }

    async storeImage(url: string) {
        console.log(url);
        let cid = await this.IPFSServvice.upload(url);
        console.log(cid);
        return cid;
    }

}
