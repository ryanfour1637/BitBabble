import REACT, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const WebSocketContext = createContext();
export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children, user }) {
   const [socket, setSocket] = useState(null);
   useEffect(() => {
      if (user) {
         const newWebSocket = io(process.env.REACT_APP_SOCKET_URL);
         setSocket(newWebSocket);
      } else {
         if (socket) socket.close();
      }
      return () => {
         if (socket) socket.close();
      };
   }, [user]);

   return (
      <WebSocketContext.Provider value={socket}>
         {children}
      </WebSocketContext.Provider>
   );
}
