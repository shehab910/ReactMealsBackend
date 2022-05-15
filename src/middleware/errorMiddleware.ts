import { Request, Response, NextFunction } from "express";

export const errorHandler = (
   err: Error,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const error = {
      error: {
         message: err.message,
         status: res.statusCode,
         stack: process.env.NODE_ENV !== "development" ? null : err.stack,
      },
   };
   res.status(res.statusCode || 500).json(error);
};
