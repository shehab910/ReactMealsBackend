import { Request, Response } from "express";
export const validateBody = (
   expectedKeys: string[],
   req: Request,
   res: Response
) => {
   expectedKeys.forEach((key) => {
      if (!req.body[key]) {
         res.status(400);
         throw new Error(`Please provide the ${key}`);
      }
   });
};
