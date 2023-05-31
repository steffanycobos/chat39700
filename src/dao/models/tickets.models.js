<<<<<<< HEAD

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
=======

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
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
