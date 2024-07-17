import { ApiError } from "exceptions";
import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line
export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    message: `Server error ${err.message}`,
  });
};
