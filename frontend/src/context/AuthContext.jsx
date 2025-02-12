import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(()=>{
       const fetchAuthUser = async ()=>{
            try {
               const res = await fetch("/api/auth/me",{
                credentials:"include"
               });
               const data = await res.json();
               if(!res.ok) throw new Error(data.error);
               
               setAuthUser(data.user);
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }finally{
                setIsLoading(false)
            }
       }
       fetchAuthUser();
  },[])

  
  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
