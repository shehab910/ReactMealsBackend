import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import { permission } from "../types/UserTypes";

export const protect = AsyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      let token;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         try {
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded: any = jwt.verify(
               token,
               process.env.JWT_SECRET || ""
            );

            //get user from the token
            const user = await User.findById(decoded.id || "");
            //pass user to the next function using res.locals
            res.locals.user = user;

            next();
         } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Unauthorized");
         }
      }

      if (!token) {
         res.status(401).json({
            message: "Unauthorized, No Token Provided",
         });
      }
   }
);

//TODO: imporve this
export const protectAdmin = AsyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      let token;
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         try {
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded: any = jwt.verify(
               token,
               process.env.JWT_SECRET || ""
            );

            //get user from the token
            const user = await User.findById(decoded.id || "");
            if (user?.permission !== permission.ADMIN) {
               throw new Error("Unauthorized");
            }
            //pass user to the next function using res.locals
            res.locals.user = user;

            next();
         } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Unauthorized");
         }
      }

      if (!token) {
         res.status(401).json({
            message: "Unauthorized, No Token Provided",
         });
      }
   }
);
