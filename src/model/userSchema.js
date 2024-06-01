import { Schema,model } from "mongoose";

const userSchema=new Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
       type:String,
       require:true
    },
    role:{
        type:String,
        require:true,
        default:"user"
    }
    
},{collection:'users'})

export const USER=model('users',userSchema);