
import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
   message:{
      type: Array,
   default: []
   }
})
 

const messagesModel= mongoose.model('messages',messagesSchema);

export default messagesModel;