
import type { NextApiRequest, NextApiResponse } from 'next'

import { NFTStorage, File, Blob } from 'nft.storage'
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEwNGZjYTUzZDY5Mjg5ZTU4MDA1ZUM4OTA5OEIzNDk2MmEzRDJCNmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjU0NDg3MDUyMywibmFtZSI6ImJpdHQgbWFpbiBrZXkifQ.Nx1s8KSFiKVOwo9AHUmPEThgItMuHAvLSZawaUS2gIY' })

export type Data = {
    metadata?: string,
    error?: string
}

export type BaseUriContentType = {
    passport: string,
    name: string,
    email: string,
    jobName: string,
    note: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const {
            passport,
            name,
            email,
            jobName,
            note
        } = req.body;

        const meta = {
            passport,
            name,
            email,
            jobName,
            note
        };

        // check passport is valid url
        if (!passport.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/)) {
            throw new Error('passport is invalid url');
        }

        const author = new Blob([JSON.stringify({
            meta
        })]);

        const metadata = await client.storeBlob(author);

        // Expect response: {metadata: <uri>}
        res.status(200).json({ metadata })
    }
    catch (err: any) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}