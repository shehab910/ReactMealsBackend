const db =
   "mongodb+srv://shehabcluster:unguided-arise-wildfire@cluster0.r8vla.mongodb.net/mealapp?retryWrites=true&w=majority"; //process.env.MONGO_URI || 'mongodb+srv://admin:unguided-arise-wildfire@shehabcluster.r8vla.mongodb.net/ReactMeal?retryWrites=true&w=majority';

import mongoose from "mongoose";

const connectDB = async () => {
   try {
      if (process.env.MONGO_URI !== undefined) {
         const conn = await mongoose.connect(process.env.MONGO_URI);
         console.log(`MongoDB Connected: ${conn.connection.host}`);
      } else {
         throw new Error();
      }
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
};

export default connectDB;
