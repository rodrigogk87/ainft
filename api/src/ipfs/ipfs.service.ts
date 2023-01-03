import { Injectable } from '@nestjs/common';
import { create } from "ipfs-http-client";


@Injectable()
export class IpfsService {


    async upload(url: string): Promise<any> {
        const projectId = process.env.INFURA_PROJECT_ID;
        const projectSecret = process.env.INFURA_API_SECRET;
        const auth =
            'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

        const ipfs = await create({
            host: 'ipfs.infura.io', port: 5001, protocol: 'https',
            headers: {
                authorization: auth,
            },
        }
        )
        const { cid } = await ipfs.add(url)
        return cid;
    }
}
