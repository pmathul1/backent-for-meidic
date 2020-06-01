const express=require('express');
const cors =require("cors");
const bodyParser=require("body-parser");
const {connect}=require("mongoose");
const {PORT,DB}=require("./config/index")
const{success,error}=require('consola');
const apiroutes=require('./Router/api-routes')

const app=express();

// ---------------middlewares-------------------s--

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api',apiroutes);

// ---------------middlewares ends---------------------


let StartApp= async ()=>
{
    try
    {
        await connect(DB,
            {useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true})
            success({message:`succesfully database connected ${DB}`,badge:true})
         app.listen(PORT,err=>{
               if(err)
                {
                    error({message:err,badge:true})
                  
                }
                else
                {
                    success({message:`listening to port ${PORT}`,badge:true})
                }
                                })
    }
  
    catch(err)
    {
        error({message:err,badge:true})
    }
};
StartApp();