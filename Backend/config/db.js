import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB is connected!!"))
//     .catch((err) => console.error(err));
// };

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected!!!");
  } catch (error) {
    console.error("MongoDB connection failed!", error.message);
    process.exit(1);
  }
};

export default connectDB;
