import mongoose from "mongoose";
import  config  from "./config.js";

export const connectDB = async () => { 
    await mongoose
       .connect(config.MONGO_URL)
        .then((conn) => {
            console.log("Connected to MongoDB!!");
        });
    
    }