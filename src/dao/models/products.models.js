import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
title: {
   type: String,
   required: true},
description: {
     type: String,
     required: true,
   },
price: {
     type: Number,
     required: true,
   },
thumbnail: {
     type: String,
     required: true,
   },
code: {
     type: String,
     required: true,
     unique: true,
   },
 stock: {
     type: Number,
     required: true,
   },
   owner:{
type: mongoose.SchemaTypes.ObjectId,
ref:'users'
   }
 },
);
productsSchema.plugin(mongoosePaginate)

const productsModel= mongoose.model('products',productsSchema);

export default productsModel;