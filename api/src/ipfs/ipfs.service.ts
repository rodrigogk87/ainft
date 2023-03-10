import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { create, IPFSHTTPClient } from "ipfs-http-client";

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_API_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

@Injectable()
export class IpfsService {

    async uploadFileFromUrl(url: string): Promise<string> {
        const ipfs = await this.getIPFSInstance();
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data, "utf-8")

        const { cid } = await ipfs.add(buffer)
        return cid.toString();
    }

    async uploadFileFromData(data: string): Promise<string> {
        const ipfs = await this.getIPFSInstance();
        const { cid } = await ipfs.add(Buffer.from(data))
        return cid.toString();
    }

    private async getIPFSInstance(): Promise<IPFSHTTPClient> {
        const ipfs = await create({
            host: 'ipfs.infura.io', port: 5001, protocol: 'https',
            headers: {
                authorization: auth,
            },
        }
        )
        return ipfs;
    }
}
