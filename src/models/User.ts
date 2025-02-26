import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    handle: string
    name: string
    email: string
    password: string
    description: string
    image: string
}

const userSchema = new Schema({
    handle: { 
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        unique: true
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    description: { 
        type: String, 
        default: '' 
    },
    image: { 
        type: String, 
        default: '' 
    }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;