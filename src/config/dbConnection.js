import mongoose from "mongoose";
import  options  from "./options.js";

export const connectDB = async () => { 
    await mongoose
       .connect(options.MONGO_URL)
        .then((conn) => {
            console.log("Connected to MongoDB!!");
        });
    
    }