import { NextFunction, Request, Response } from "express";
import { cache } from "configs";
import { Wrapper } from "./types";

export const wrapper =
  <Params = void>(fn: Wrapper<Params>) =>
  async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
      const { request, cacheKey } = fn(req, res);

      const cachedRecord = await cache.get(cacheKey);

      if (!cachedRecord) {
        const record = await request();

        await cache.set(cacheKey, JSON.stringify(record));

        res.json(record);
      } else {
        res.json(JSON.parse(cachedRecord));
      }
    } catch (e) {
      next(e);
    }
  };
