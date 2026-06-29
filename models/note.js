import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    // title, content, category, tags, status, isPinned, userId, timestamps
    title : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 50
    },
    content : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 500
    },
    category : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 50
    },
    tags : {
        type : [String] ,
        default : []
    },
    status : {
        type : String ,
        enum : ["active" , "archived" , "deleted"] ,
        default : "active"
    },
    isPinned : {
        type : Boolean ,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    },
    color:{
        type : String ,
        default : "white"
    }
}, {timestamps: true}) ;

const Note = mongoose.model("Note" , noteSchema);

export default Note;