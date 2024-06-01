import express from 'express'
import {config} from 'dotenv'
import { connecttodb } from './src/config/db.js';
import { userRoute } from './src/route/userRoute.js';
import  session from 'express-session';
import MongoStore from 'connect-mongo';
import { todoRouter } from './src/route/todoRoute.js';
import cors from 'cors'

config();

const app=express();

app.use(express.json());

app.use(cors());

const port=process.env.PORT||9090;

const uri=process.env.URI||null;

app.use(session({
    secret:process.env.JWT_SEACRET,
    Store:MongoStore.create({
        mongoUrl:uri,
        collectionName:'session'
    }),
    resolve:false,
    saveUninitialized:false,
    Cookie:{
        maxAge:1000*60*60
    }
}))

app.use("/user",userRoute);

app.use("/todos",todoRouter)

app.listen(port,async()=>{
    try{
        await connecttodb(uri);
        console.log('database connected successfully')
        console.log(`server connected at the port number ${port}`);
    }catch(err){
        console.log(err);
    }
    
})

