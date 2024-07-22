import { NextFunction, Request, Response } from "express";
import { filesService } from "services";
import { ProductImage } from "types";

export const getOne = async (
  req: Request<ProductImage>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { params } = req;
    await filesService.getFile(params, res);
  } catch (e) {
    next(e);
  }
};
