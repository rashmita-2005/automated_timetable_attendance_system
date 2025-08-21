/* eslint react-refresh/only-export-components: "off" */
import {createContext, useState, useEffect} from "react";
import {addStudent as addStudentService,getStudents,updateStudent as updateStudentService,deleteStudent as deleteStudentService} from "../services/studentService";
export const StudentContext=createContext();
export const StudentProvider=({children})=>{
    const [students,setStudents]=useState([]);

    useEffect(()=>{
        const fetchStudents=async()=>{
            try{
                const data=await getStudents();
                setStudents(data.map(s=>({...s,id:s._id})));
            }catch(err){
                console.error(err);
            }
        };
        fetchStudents();
    },[]);

    const addStudent=async(student)=>{
        const created=await addStudentService(student);
        const createdWithId={...created,id:created._id};
        setStudents((prev)=>[...prev,createdWithId]);
    };

    const updateStudent=async(student)=>{
        const updated=await updateStudentService(student.id,student);
        const updatedWithId={...updated,id:updated._id};
        setStudents((prev)=>prev.map(s=>s.id===student.id?updatedWithId:s));
    };

    const deleteStudent=async(id)=>{
        await deleteStudentService(id);
        setStudents((prev)=>prev.filter(s=>s.id!==id));
    };

    return(
        <StudentContext.Provider value={{students,addStudent,updateStudent,deleteStudent}}>
            {children}
        </StudentContext.Provider>
    );
};
