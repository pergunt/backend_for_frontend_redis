import path from "node:path";
import { Response } from "express";
import fs from "node:fs";
import { ImagesAPI } from "apis";
import { ProductImage } from "types";

export default class ImagesService {
  api: ImagesAPI;

  constructor(api: ImagesAPI) {
    this.api = api;
  }

  async getOne(productImage: ProductImage, res: Response) {
    const { category, title, fileID } = productImage;
    const imagePATH = path.resolve(
      __dirname,
      "static",
      category,
      title,
      fileID
    );
    const fileExists = fs.existsSync(imagePATH);

    if (fileExists) {
      fs.createReadStream(imagePATH).pipe(res);
      return;
    }

    const response = await this.api.getOne({
      category,
      title,
      fileID,
    });

    const saveDirectory = path.resolve(__dirname, "static", category, title);

    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    const writer = fs.createWriteStream(imagePATH);

    response.data.pipe(writer);
    response.data.pipe(res);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }
}
