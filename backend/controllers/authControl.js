const {Router}=require('express');
const authRouter=Router();
const {z}=require('zod');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {userModel}=require('../models/user');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

authRouter.post("/register",async function(req,res){
    try{
        const requiredBody=z.object({
            email:z.string().min(5).max(80).email(),
            name:z.string().min(4).max(100),
            password:z.string().min(6).max(100),
            role:z.string(),
        });
        const safeParsedBody=requiredBody.safeParse(req.body);
        if(!safeParsedBody.success){
            res.json({
                message:"Invalid inputs",
                error:safeParsedBody.error
            })
            return;
        }
        const {email,name,password,role}=req.body;

        if(!name|| !email || !password || !role ){
            return res.status(400).json({message:"All fields are required"});
        }

        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user is already registered"});
        }
        const passwordHash=await bcrypt.hash(password,10);
        await userModel.create({
            name,
            email,
            passwordHash,
            role,
        });
        res.status(201).json({
            name,
            email,
            role,
        })
    }catch(error){
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
    
})

authRouter.post("/login", async function(req,res){
    try{
        const requiredBody=z.object({
            email:z.string().min(5).max(80).email(),
            password:z.string().min(6).max(100),
        });
        const parsedBody=requiredBody.safeParse(req.body);
        if(!parsedBody.success){
            res.json({
                message:"Invalid inputs",
                error:parsedBody.error
            })
            return;
        }
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const matchPassword=await bcrypt.compare(password,user.passwordHash);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid email or password"});
        }
        res.json({
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token: generateToken(user._id, user.role),
        });
    }catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
});
module.exports={authRouter};

