import { Schema, model } from "mongoose";
import IUser, { permission } from "../types/UserTypes";

const userSchema = new Schema<IUser>(
   {
      username: {
         type: String,
         required: [true, "Please add a username"],
      },
      email: {
         type: String,
         required: [true, "Please add a username"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Please add a password"],
      },
      permission: { type: String, required: true, default: permission.USER },
   },
   { timestamps: true }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
