
import type { NextApiRequest, NextApiResponse } from 'next'

import { NFTStorage, File, Blob } from 'nft.storage'
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEwNGZjYTUzZDY5Mjg5ZTU4MDA1ZUM4OTA5OEIzNDk2MmEzRDJCNmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjU0NDg3MDUyMywibmFtZSI6ImJpdHQgbWFpbiBrZXkifQ.Nx1s8KSFiKVOwo9AHUmPEThgItMuHAvLSZawaUS2gIY' })

import { NearAuthorType } from '../../../../data/types'

type Data = {
    metadata: string
}

export type BaseUriContentType = {
    avatar: string;
    bgImage: string;
    displayName: string;
    email: string;
    desc: string;
    jobName: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // read file as binary
    // const testImage = await fs.promises.readFile(
    //   "src/images/Apple.svg"
    // )

    // const testImageBlob = await client.storeBlob(
    //   new Blob(
    //     [
    //       JSON.stringify(testImage).to_string()
    //     ]
    //   )
    // )

    try {
        const { avatar, displayName, bgImage, desc, email, href, jobName }: NearAuthorType = req.body;

        const meta = {
            avatar,
            bgImage,
            displayName,
            desc,
            email,
            href,
            jobName
        }

        const author = new Blob([JSON.stringify({
            meta
        })]);

        const metadata = await client.storeBlob(author);

        // Expect response: {metadata: <uri>}
        res.status(200).json({ metadata })
    }
    catch (err) {
        console.error(err)
        res.status(500)
        res.end()
    }
}