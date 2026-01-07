import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
    throw new Error("mongoDb URI IS Missing")
}
export async function connectDB(){
    if(mongoose.connection.readyState === 1) return;
    await mongoose.connect(MONGO_URI);
    console.log("ConnectDb")
}