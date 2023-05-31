<<<<<<< HEAD
import mongoose from "mongoose";
import  options  from "./options.js";

export const connectDB = async () => { 
    await mongoose
       .connect(options.MONGO_URL)
        .then((conn) => {
            console.log("Connected to MongoDB!!");
        });
    
=======
import mongoose from "mongoose";
import  options  from "./options.js";

export const connectDB = async () => { 
    await mongoose
       .connect(options.MONGO_URL)
        .then((conn) => {
            console.log("Connected to MongoDB!!");
        });
    
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
    }