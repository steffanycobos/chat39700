import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    rol: {
        type: String,
        required:true,
        enum:["user","admin"],
        default: 'user',
    }
});



const UserModel = mongoose.model('users',userSchema);

export default UserModel;