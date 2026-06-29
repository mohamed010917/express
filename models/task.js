import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    // title , doIn , isDone , userId , timestamps  , Priority , catgory ,status
    title : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 50
    },
    content :{
        type : String ,
        required : true ,
      
    },
    doIn : {
        type : Date ,
        required : true
    },
    isDone : {
        type : Boolean ,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    },
    Priority : {
        type : String ,
        enum : ["low" , "medium" , "high" , "urgent"] ,
        default : "low"
    },
    catgory : {
        type : String ,
        enum : ["work" , "personal" , "shopping" , "other"] ,
        default : "other"
    },
    status : {
        type : String ,
        enum : ["todo" , "in-progress" , "review" , "done"] ,
        default : "To Do"
    },
  

},{timestamps : true}) ;



const Task = mongoose.model("Task" , taskSchema);

export default Task;