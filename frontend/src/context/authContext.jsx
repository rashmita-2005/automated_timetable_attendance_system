import {createContext, useState, useEffect} from "react";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    
    useEffect(()=>{
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== "undefined") {
                setUser(JSON.parse(storedUser));
            }
            } catch (err) {
            console.error("Invalid user data in localStorage:", err);
            localStorage.removeItem("user"); // clean up bad data
            }
        }, []);

    const login=(userData)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const logout=(userData)=>{
        setUser(null);
        localStorage.removeItem("user");
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};