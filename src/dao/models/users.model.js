<<<<<<< HEAD
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
        enum: ["user", "admin"],
        default: 'user',
    }
});



const UserModel = mongoose.model('users', userSchema);

=======
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
        enum: ["user", "admin"],
        default: 'user',
    }
});



const UserModel = mongoose.model('users', userSchema);

>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
export default UserModel;