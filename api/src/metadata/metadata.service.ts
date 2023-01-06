import { Inject, Injectable } from '@nestjs/common';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class MetadataService {

    @Inject(OpenaiService)
    private readonly openAiService: OpenaiService;
    @Inject(IpfsService)
    private readonly IPFSServvice: IpfsService;

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
        const { url, attributes } = await this.openAiService.generateImage();
        const hash = await this.storeImage(url);

        return { hash: hash, attributes: attributes };
    }

    private async storeImage(url: string) {
        console.log(url);
        let cid = await this.IPFSServvice.uploadFileFromUrl(url);
        console.log(cid);
        return cid;
    }



}
