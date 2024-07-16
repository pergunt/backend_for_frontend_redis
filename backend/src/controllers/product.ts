import { productService } from "services";
import { NextFunction, Request, Response } from "express";

type Fn<Params = void> = (
  req: Request<Params>,
  res: Response,
  next: NextFunction
) => Promise<any>;

const wrapper =
  <Params = void>(fn: Fn<Params>) =>
  async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };

export const getList = wrapper(async (req, res) => {
  const users = await productService.getList();

  return res.json(users);
});

export const getOne = wrapper<{ id: number }>(async (req, res) => {
  const user = await productService.getByID(req.params.id);

  return res.json(user);
});
