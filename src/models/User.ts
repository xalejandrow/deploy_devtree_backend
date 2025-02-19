import mongoose, { Schema } from "mongoose";

export interface IUser {
    name: string
    email: string
    password: string
}

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;