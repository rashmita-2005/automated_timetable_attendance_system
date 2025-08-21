/* eslint react-refresh/only-export-components: "off" */
import {createContext, useState, useEffect} from "react";
import {addStudent as addStudentService,getStudents} from "../services/studentService";
export const StudentContext=createContext();
export const StudentProvider=({children})=>{
    const [students,setStudents]=useState([]);

    useEffect(()=>{
        const fetchStudents=async()=>{
            try{
                const data=await getStudents();
                setStudents(data);
            }catch(err){
                console.error(err);
            }
        };
        fetchStudents();
    },[]);

    const addStudent=async(student)=>{
        const created=await addStudentService(student);
        setStudents((prev)=>[...prev,created]);
    };

    return(
        <StudentContext.Provider value={{students,addStudent}}>
            {children}
        </StudentContext.Provider>
    );
};
