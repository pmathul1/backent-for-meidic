const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Vendorauth=require('../Model/Auth/Vendor-Auth')
const bcrypt=require("bcrypt")


//================vendor api starts=================

router.post('/vendor/register',async(req,res)=>{
    let errors=[];
    let { clinical_name,email,phone,password,password2}=req.body;
    if(!clinical_name)
    {
        errors.push({text:"name field is required"})
    }
    if(!email)
    {
        errors.push({text:"email field is required"})
    }
    if(!phone)
    {
        errors.push({text:"phone field is required"})
    }
    if(password!==password2)
    {
        errors.push({text:"password should match "})
    }
    if(errors.length>0)
    {
        res.status(404).json({errors,message:"all fileds  are required"})
    
    }
    else
    {
        let emailuser=await Vendorauth.findOne({email})
        let phoneuser=await Vendorauth.findOne({phone})
        if(emailuser)
        {
            errors.push({text:"email already registered"})
           
        }
        if(phoneuser)
        {
            errors.push({text:"number already registered"})
        }
        if(errors.length>0)
        {
            res.status(409).json({errors,message:"already registered"})
        }
        else
        {
            await bcrypt.hash(password, 10, async(err, hash)=>{
                // Store hash in your password DB.
                let data={clinical_name,email,phone,password:hash}
                let newuser = await new Vendorauth(data).save()
                res.status(201).json({message:"succesfully registered"})   ///======================changed
            });
            
            
        }
    }
    // let newdata={clinical_name,email,phone,password}

})

//================api ends=================


module.exports=router