const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require("./config_db");

connectDB();

const{authRouter}=require("./controllers/authControl");

const app=new express();
app.use(express.json());
app.use("/api/auth/user",authRouter);

app.listen(5000);