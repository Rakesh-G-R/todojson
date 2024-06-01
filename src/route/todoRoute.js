import { Router } from "express";
import { TODO } from "../model/todoSchema.js";
import { auth } from "../middleware/auth.js";

export const todoRouter=Router();

todoRouter.get("/",auth(["user","admin"]),async(req,res)=>{
    let{page,limit}=req.query;
    const pages=page-1;
    try{
        if(page!==undefined){
            const todos=await TODO.find().skip(pages*limit).limit(limit);
            return res.status(201).send(todos);
        }
        else{
            const todos=await TODO.find();
            return res.status(201).send(todos);
        }
       
    }catch(err){
        console.log(err);
    }
})

todoRouter.post("/",auth(["user","admin"]),async(req,res)=>{
    let {title,desc,status}=req.body;
    console.log(req.body)
    try{
        const todo=new TODO({title,desc,status});
        await todo.save();
        res.status(201).send("todo created successfully")
    }catch(err){
     console.log(err)
    }
})

todoRouter.patch("/:id",auth(["user","admin"]),async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    let {title,desc,status}=req.body;
    try{
       const todo= await TODO.findByIdAndUpdate(id,{title,desc,status})
       res.status(201).send("update successfully")
    }catch(err){
        console.log(err);
    }
})

todoRouter.delete("/:id",auth(["admin"]),async(req,res)=>{
    let {id}=req.params;
    try{
       const todo=await TODO.findByIdAndDelete(id);
       res.status(201).send("deleted successfully")
    }catch(err){
        console.log(err);
    }
})