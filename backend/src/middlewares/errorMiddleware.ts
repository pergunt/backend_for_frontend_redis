import { ApiError } from "exceptions";
import { Request, Response } from "express";

// just in case: (err: Error, req: Request, res: Response, next: NextFunction)
export default (err: Error, req: Request, res: Response) => {
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
