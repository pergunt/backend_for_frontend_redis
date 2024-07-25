import { NextFunction, Request, Response } from "express";
import { ImagesService } from "services";
import { imagesAPI } from "apis";
import { ProductImage } from "types";

const imagesService = new ImagesService(imagesAPI);

export const getOne = async (
  req: Request<ProductImage>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;

    await imagesService.getOne(params, res);
  } catch (e) {
    next(e);
  }
};
