import type { NextApiRequest, NextApiResponse } from "next";

import { NFTStorage, File, Blob } from "nft.storage";
const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEwNGZjYTUzZDY5Mjg5ZTU4MDA1ZUM4OTA5OEIzNDk2MmEzRDJCNmYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMjU0NDg3MDUyMywibmFtZSI6ImJpdHQgbWFpbiBrZXkifQ.Nx1s8KSFiKVOwo9AHUmPEThgItMuHAvLSZawaUS2gIY",
});

import { CampaignDataType } from "../../../../data/types";

type Data = String;

export type BaseUriContentType = {
  description: string;
  video_url: string;
  audio_url: string;
  featured_image: string;
};

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
    const {
      description,
      video_url,
      audio_url,
      featured_image,
    }: CampaignDataType = req.body;

    const meta = {
      description,
      video_url,
      audio_url,
      featured_image,
    };

    const campaign = new Blob([JSON.stringify(meta)]);

    const metadata = await client.storeBlob(campaign);

    // Expect response: {metadata: <uri>}
    res.status(200).json(metadata);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.end();
  }
}
