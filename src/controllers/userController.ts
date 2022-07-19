import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { validateBody } from "./controllerUtils";

// @desc  Register new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(
   async (req: Request, res: Response) => {
      const expectedFromBody = ["username", "email", "password"];
      validateBody(expectedFromBody, req, res);

      //check if user exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
         res.status(400);
         throw new Error("User already exists");
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create user
      const user = await User.create({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
      });

      if (user) {
         res.status(201);
         res.json({
            message: "User created successfully",
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateJWT(user.id),
         });
      } else {
         res.status(400);
         throw new Error("Invalid user data, User not created");
      }
   }
);

// @desc  Login a user
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
   const expectedFromBody = ["email", "password"];
   validateBody(expectedFromBody, req, res);

   const user = await User.findOne({ email: req.body.email });
   if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.json({
         message: "Logged in successfully",
         _id: user.id,
         username: user.username,
         email: user.email,
         permission: user.permission,
         token: generateJWT(user.id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid credentials");
   }
});

// @desc  Get user data
// @route GET /api/users/me
// @access Private
export const getMe = asyncHandler(async (req: Request, res: Response) => {
   const { _id, username, email } = res.locals.user;
   res.json({
      _id,
      username,
      email,
   });
});

// Generate JWT
const generateJWT = (id: any) => {
   return jsonwebtoken.sign({ id }, process.env.JWT_SECRET || "msaies2!w#", {
      expiresIn: "30d",
   });
};
