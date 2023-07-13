const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = express.Router()
const {userModel} = require('../models/user.model')

userRouter.post('/signup', async(req,res) => {
    try{
    const {email, password, confirmPassword} = req.body;
    if(password !== confirmPassword) return res.send("Password and Confirm password should be matched!!")
    const isUserPresent = await userModel.findOne({email})
    if(isUserPresent) return res.send('User Present already, login please')
    const hash = await bcrypt.hash(password,5);
    const newUser = new userModel({email,password:hash, confirmPassword:hash})
     await newUser.save()
     res.send('Signup Successful')
    }
    catch(err){
        res.send(err.message)
    }
})


userRouter.post('/login',async(req,res) => {
    try{
        try {
         
            const {email, password} = req.body;
    
            const isUserPresent  = await userModel.findOne({email});
    
            if(!isUserPresent) return res.send("user not present, Register please");
    
            const isPasswordCorrect = await bcrypt.compare(password,isUserPresent.password);
    
            if(!isPasswordCorrect) return res.send("Invalid Credentials");
    
            const token = jwt.sign({userId:isUserPresent._id,city:isUserPresent.city},process.env.secret_key, {expiresIn:"1hr"})
    
            res.status(200).send({message: "Login Success", token});
    
    
        } catch(err) {
             res.status(400).send(err.message)
        }
    }
    catch(err){

    }
})



module.exports = {userRouter}