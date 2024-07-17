import { productService } from "services";
import { NextFunction, Request, Response } from "express";

type Fn<Params = void> = (req: Request<Params>, res: Response) => Promise<any>;

const wrapper =
  <Params = void>(fn: Fn<Params>) =>
  async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (e) {
      next(e);
    }
  };

export const getList = wrapper(async (req, res) => {
  const products = await productService.getList(req.query);

  res.json(products);
});

export const getOne = wrapper<{ id: number }>(async (req, res) => {
  const product = await productService.getByID(req.params.id);

  res.json(product);
});

export const getCategoryList = wrapper(async (req, res) => {
  const categoryList = await productService.getCategoryList();

  res.json(categoryList);
});

export const getByCategory = wrapper<{ category: string }>(async (req, res) => {
  const products = await productService.getByCategory(req.params.category);

  res.json(products);
});
