const express = require('express')
import {Request,Response } from "express";
import User from "./user" ; 
import bodyParser from "body-parser" ; 
import serveStatic from "serve-static" ; 
import cors from "cors" ; 
import mongoose from "mongoose";

const app = express();  

app.use(bodyParser.json()) ; 

app.use(serveStatic("public")) ; 

app.use(cors()) ;

const uri:string="mongodb://localhost:27017/weConnect" ; 



mongoose.connect(uri,(err)=>{
    if(err){
        console.log(err); 
    }
    else{
        console.log("Mongo db connection success") ; 
    }
})
app.get("/",(req:Request,resp:Response)=>{
    resp.send("Setting Up") ; 
});
app.get("/users",(req:Request,resp:Response)=>{
    User.find((err,users)=>{
        if(err){
            resp.status(500).send(err);
        }
        else{
            resp.send(users) ; 
        }
    }) ; 
}) ; 


//requete post
app.post("/users",(req:Request,resp:Response)=>{
    let user = new User(req.body);
    user.save(err=>{
        if(err) resp.status(500).send(err); 
        else resp.send(user) ; 
    });
});

app.post("/users/:id",(req:Request,resp:Response)=>{
    User.findByIdAndUpdate(req.params.id,req.body,(err: any,book: any)=>{
        if(err) resp.status(500).send(err) ; 
        else {
            resp.send("successfully updated user")
        }
    })
})

app.delete("/users/:id",(req:Request,resp:Response)=>{
    User.deleteOne({_id:req.params.id},err=>{
        if(err) resp.status(500).send(err) ; 
        else resp.send("Successfully deleted user");
    });
});

app.listen(8011,()=>{
    console.log("Server Started on port 8011")
})