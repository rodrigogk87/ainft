import { Inject, Injectable } from '@nestjs/common';
import IOpenAImage from 'src/interfaces/IOpenAImage.interface';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class MetadataService {

    @Inject(OpenaiService)
    private readonly openAiService: OpenaiService;
    @Inject(IpfsService)
    private readonly IPFSServvice: IpfsService;

    async generateMetadata(): Promise<string> {
        const { OpenAImage, hash } = await this.generateAndStoreImage();
        const metadata = JSON.stringify({
            description: "Random generated AINFT",
            image: "ipfs://" + hash,
            name: OpenAImage.attributes.class,
            attributes: [{
                "trait_type": "Class",
                "value": OpenAImage.attributes.class
            }, {
                "trait_type": "Title",
                "value": OpenAImage.attributes.title
            }, {
                "trait_type": "Eyes",
                "value": OpenAImage.attributes.eyes
            }, {
                "trait_type": "Hair",
                "value": OpenAImage.attributes.hair
            }]
        });
        const cid = await this.IPFSServvice.uploadFileFromData(metadata);

        return cid.toString();
    }

    private async generateAndStoreImage(): Promise<{ OpenAImage: IOpenAImage, hash: string }> {
        const OpenAImage = await this.openAiService.generateImage();
        const hash = await this.IPFSServvice.uploadFileFromUrl(OpenAImage.url);
        return { OpenAImage, hash };
    }



}
