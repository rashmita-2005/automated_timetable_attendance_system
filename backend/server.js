const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require("./config_db");

connectDB();

const{authRouter}=require("./controllers/authControl");
const{studentRouter}=require("./controllers/studentController");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use("/api/auth/user",authRouter);
app.use("/api/students",studentRouter);

app.listen(5000);
