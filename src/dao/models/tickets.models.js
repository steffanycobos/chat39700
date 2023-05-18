
import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
  code: {
    type: String,
    require:true,
    unique:true
  },
  purchase_datetime: Date,
  amount: Number,
  purchaser:{
    type:String,
    requires:true
  }
});

const ticketsModel = mongoose.model("tickets", ticketsSchema);

export default ticketsModel;
