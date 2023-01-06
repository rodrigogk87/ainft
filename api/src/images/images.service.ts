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
        const { hash, attributes } = await this.generateImage();
        const metadata = JSON.stringify({
            description: "Random generated AINFT",
            image: "ipfs://" + hash,
            name: attributes.class,
            attributes: [{
                "trait_type": "Class",
                "value": attributes.class
            }, {
                "trait_type": "Title",
                "value": attributes.title
            }, {
                "trait_type": "Eyes",
                "value": attributes.eyes
            }, {
                "trait_type": "Hair",
                "value": attributes.hair
            }]
        });
        let cid = await this.IPFSServvice.uploadFileFromData(metadata);
        console.log(cid);
        return cid.toString();
    }

    private async generateImage(): Promise<any> {
        //generate images
        const { url, prompt, attributes } = await this.openAiService.generateImage();
        const hash = await this.storeImage(url);
        const createdImage = new this.imageModel({ prompt, hash });
        await createdImage.save();

        return { hash: hash, attributes: attributes };
    }

    private async storeImage(url: string) {
        console.log(url);
        let cid = await this.IPFSServvice.uploadFileFromUrl(url);
        console.log(cid);
        return cid;
    }



}
