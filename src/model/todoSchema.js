import { Schema,model } from "mongoose";

const todoSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:["to-do", "in-progress", "done"],
        default:"to-do"
    }
})

export const TODO=model('todos',todoSchema);