import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const WebSocketContext = createContext();
export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children, user }) {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      if (user) {
         const newWebSocket = io(process.env.REACT_APP_BASE_URL);
         setSocket(newWebSocket);
      }
   }, [user]);

   useEffect(() => {
      return () => {
         if (socket) {
            socket.disconnect();
            setSocket(null);
         }
      };
   }, [socket]);

   return (
      <WebSocketContext.Provider value={socket}>
         {children}
      </WebSocketContext.Provider>
   );
}
