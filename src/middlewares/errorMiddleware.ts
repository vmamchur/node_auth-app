import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).send({ message, errors });
  }

  res.status(500).send({
    message: 'Unexpected error',
  });
}
