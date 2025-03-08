const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const {generateToken}=require("../config/jwt")
const user=require("../models/User")

router.post("/signup", async(req,res)=>{
    try{
        const {username,email,password,mobile}=req.body
        let existingUser=await user.findOne({email})
        if(existingUser){
            return res.status(400).json({"message":"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({username,email,password:hashedPassword,mobile})
        console.log("signup route",newUser)
        const token=generateToken(newUser._id)
        res.status(201).json({"message":"User created successfully","user":newUser})
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message":"Internal Server Error"})
    }
})

module.exports=router