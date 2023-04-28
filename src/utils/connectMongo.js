import mongoose from "mongoose";

const connectMongoDB = async () => mongoose.connect(process.env.DB_URL)

export default connectMongoDB