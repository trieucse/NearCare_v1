// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { NFTStorage, File, Blob } from 'nft.storage'
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEwNGZjYTUzZDY5Mjg5ZTU4MDA1ZUM4OTA5OEIzNDk2MmEzRDJCNmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjU0NDg3MDUyMywibmFtZSI6ImJpdHQgbWFpbiBrZXkifQ.Nx1s8KSFiKVOwo9AHUmPEThgItMuHAvLSZawaUS2gIY' })

import fs from 'fs'

type Data = {
  metadata: string
}

type BaseUriContentType = {
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
  // try {

  // }

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

  const author = new Blob([JSON.stringify({
    avatar: 'https://avatars0.githubusercontent.com/u/12097?s=460&v=4',
    bgImage: ['https://avatars0.githubusercontent.com/u/12097?s=460&v=4'],
    displayName: 'John Cena',
    email: 'hopthucuatin@gmail.com',
    desc: 'lorem ipsum dolor sit amet',
    jobName: 'CEO',
    // testImage: "https://ipfs.io/ipfs/" + testImageBlob
    // 
  })]);

  const metadata = await client.storeBlob(author);

  res.status(200).json({ metadata })
}
