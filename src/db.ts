import mongoose from "mongoose";
import { DB_NAME, MONGODB_URL } from "./constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED\n", error);
    process.exit(1);
  }
};

export default connectDB;
