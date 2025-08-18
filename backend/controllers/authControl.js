const {Router}=require('express');
const registerRouter=Router();
const {z}=require('zod');
const jwt=require('jsonwebtoken');
const {userModel}=require('../models/user');

registerRouter.post("/register",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(15).max(80).email(),
        name:z.string().min(4).max(100),

    });
    
})