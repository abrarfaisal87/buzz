import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = ()=>{
    const context = useContext(SocketContext);
    if(context === undefined){
        throw new Error("use socket context  within a provider ")
    }
    return context; 
}

const SocketContextProvider = ({ children }) => {
  const socketRef = useRef(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser, isLoading } = useAuthContext();

  const socketURL =
    import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    }else if(!authUser && !isLoading){
        if(socketRef.current){
            socketRef.current.close();
            socketRef.current = null;
        }
    }
  }, [authUser,isLoading]);
  
  return (
    <SocketContext.Provider  value={{socket:socketRef.current,onlineUsers}}>
      {children}
    </SocketContext.Provider>
  )
};
export default SocketContextProvider;

