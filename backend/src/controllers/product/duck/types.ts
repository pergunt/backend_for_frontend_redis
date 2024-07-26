import { Request, Response } from "express";

export type Wrapper<Params = void> = (
  req: Request<Params>,
  res: Response
) => {
  request: () => Promise<any>;
  cacheKey: string;
};
