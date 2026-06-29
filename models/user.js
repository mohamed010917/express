import mongoose from "mongoose";
import { nullable, regex } from "zod";

const userSchema = new mongoose.Schema({
    name :{
        type: String ,
        required: true,
        minlength : 3 ,
        maxlength : 50
    },
    email : {
        type: String ,
        required: true,
        regex : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ,
        unique : true ,
    },
    password : {
        type: String ,
        required: true,
        minlength : 6 ,
        maxlength : 1024
    },
    image :{
        type: String ,
        nullable ,
    }
}, {timestamps : true});


const User = mongoose.model("User" , userSchema);

export default User;