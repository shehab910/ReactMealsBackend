import { Schema, model } from "mongoose";
import IUser from "../types/UserTypes";

const userSchema = new Schema<IUser>(
   {
      username: { type: String, required: [true, "Please add a username"] },
      password: {
         type: String,
         required: [true, "Please add a password"],
         unique: true,
      },
      permission: { type: String },
   },
   { timestamps: true }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
