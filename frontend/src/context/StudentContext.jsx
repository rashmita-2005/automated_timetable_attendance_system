/* eslint react-refresh/only-export-components: "off" */
import {createContext, useState, useEffect} from "react";
export const StudentContext=createContext();
export const StudentProvider=({children})=>{
    const [students,setStudents]=useState([]);

    useEffect(()=>{
        const stored=localStorage.getItem("students");
        if(stored){
            setStudents(JSON.parse(stored));
        }
    },[]);

    const persist=(data)=>{
        setStudents(data);
        localStorage.setItem("students",JSON.stringify(data));
    };

    const addStudent=(student)=>{
        const newStudent={...student,id:Date.now().toString()};
        persist([...students,newStudent]);
    };

    const updateStudent=(updated)=>{
        const updatedList=students.map((s)=>s.id===updated.id?updated:s);
        persist(updatedList);
    };

    const deleteStudent=(id)=>{
        const updatedList=students.filter((s)=>s.id!==id);
        persist(updatedList);
    };

    return(
        <StudentContext.Provider value={{students,addStudent,updateStudent,deleteStudent}}>
            {children}
        </StudentContext.Provider>
    );
};
