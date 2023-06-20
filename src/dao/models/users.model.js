
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,

    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        default: [],
    }],

    rol: {
        type: String,
        required: true,
        enum: ["user", "admin", "premium"],
        default: 'user',
    }
});



const UserModel = mongoose.model('users', userSchema);


export default UserModel;