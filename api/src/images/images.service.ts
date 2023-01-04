import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { OpenaiService } from 'src/openai/openai.service';
import { GenerateImageDto } from './dtos/generate-image.dto';
import { ImageDocument, Image } from './schemas/images.schema';

@Injectable()
export class ImagesService {

    @Inject(OpenaiService)
    private readonly openAiService: OpenaiService;
    @Inject(IpfsService)
    private readonly IPFSServvice: IpfsService;
    @InjectModel("Image")
    private imageModel: Model<ImageDocument>;

    async generateImages(generateImageDto: GenerateImageDto): Promise<Image> {
        //generate images
        const prompt = `a legendary ${generateImageDto.class}, ${generateImageDto.eyes} eyes, ${generateImageDto.hair} hair, epic and abstract style`;
        const imageUrl = await this.openAiService.generateImage(generateImageDto);
        const hash = await this.storeImage(imageUrl);
        const createdImage = new this.imageModel({ prompt, hash });

        return createdImage.save();
    }

    async storeImage(url: string) {
        console.log(url);
        let cid = await this.IPFSServvice.upload(url);
        console.log(cid);
        return cid;
    }

}
