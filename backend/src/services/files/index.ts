import path from "node:path";
import { Response } from "express";
import fs from "node:fs";

import { ProductImage } from "types";
import { API_IMAGE_URL } from "consts";
import axios from "axios";

export const getFile = async (productImage: ProductImage, res: Response) => {
  const { category, title, fileID } = productImage;
  const imagePATH = path.resolve(__dirname, "static", category, title, fileID);
  const fileExists = fs.existsSync(imagePATH);

  if (fileExists) {
    fs.createReadStream(imagePATH).pipe(res);
    return;
  }

  const url = `${API_IMAGE_URL}/products/images/${category}/${title}/${fileID}`;

  const response = await axios.get(encodeURI(url), {
    responseType: "stream",
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
};
