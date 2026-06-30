import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is missing.");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(`Database Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
