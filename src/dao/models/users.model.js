import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,

  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      default: [],
    },
  ],

  rol: {
    type: String,
    required: true,
    enum: ["user", "admin", "premium"],
    default: "user",
  },

  last_connection: {
    type: Date,
    default: null,
  },
  status:{
    type:String,
    required:true,
    enums:['Completo','Pendiente', 'Incompleto'],
    default:"Pendiente"
},
documents:{
    type:[
        {
            name:{type:String, required:true},
            reference:{type:String, required:true}
        }
    ],
    default:[]
},

avatar:{type:String, default:""}
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
