import axios from "axios";

export const addStudent=async(data)=>{
    const res=await axios.post("/api/students",data);
    return res.data;
};

export const getStudents=async()=>{
    const res=await axios.get("/api/students");
    return res.data;
};
