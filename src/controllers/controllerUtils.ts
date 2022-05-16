import { Request, Response } from "express";
import { permission } from "../types/UserTypes";
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

export const validateAdmin = (res: Response) => {
   if (res.locals.user.permission !== permission.ADMIN) {
      res.status(401);
      throw new Error("Unauthorized");
   }
};
