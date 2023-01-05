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

    async generateMetadata(): Promise<any> {
        const image = await this.generateImage();
        const metadata = JSON.stringify({ description: "Random generated AINFT", image: "ipfs://" + image.hash, name: "Name", "attributes": [] });
        let cid = await this.IPFSServvice.uploadFileFromData(metadata);
        console.log(cid);
        return cid.toString();
    }

    private async generateImage(): Promise<Image> {
        //generate images
        const { url, prompt } = await this.openAiService.generateImage();
        const hash = await this.storeImage(url);
        const createdImage = new this.imageModel({ prompt, hash });

        return createdImage.save();
    }

    private async storeImage(url: string) {
        console.log(url);
        let cid = await this.IPFSServvice.uploadFileFromUrl(url);
        console.log(cid);
        return cid;
    }



}
