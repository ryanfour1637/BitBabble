import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const WebSocketContext = createContext();
export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children, user }) {
   const [socket, setSocket] = useState(null);
   const [reconnectAttempts, setReconnectAttempts] = useState(0);

   const maxReconnectAttempts = 5; // Maximum number of reconnection attempts
   const reconnectInterval = 2000; // Time to wait before trying to reconnect (in milliseconds)

   useEffect(() => {
      let newWebSocket;

      if (user) {
         newWebSocket = io(process.env.REACT_APP_BASE_URL);

         newWebSocket.on("connect", () => {
            console.log("WebSocket Connected");
            setReconnectAttempts(0); // Reset reconnection attempts on successful connection
         });

         newWebSocket.on("disconnect", () => {
            console.log("WebSocket Disconnected");
            attemptReconnect(newWebSocket);
         });

         newWebSocket.on("connect_error", (error) => {
            console.error("Connection Error:", error);
            attemptReconnect(newWebSocket);
         });

         setSocket(newWebSocket);
      }

      return () => {
         if (newWebSocket) {
            newWebSocket.disconnect();
            console.log("WebSocket Disconnected due to cleanup");
         }
      };
   }, [user]);

   const attemptReconnect = (socketInstance) => {
      if (reconnectAttempts < maxReconnectAttempts) {
         setTimeout(() => {
            console.log(
               `Attempting to reconnect... (Attempt ${reconnectAttempts + 1})`
            );
            setReconnectAttempts((prevAttempts) => prevAttempts + 1);
            socketInstance.connect();
         }, reconnectInterval * reconnectAttempts);
      }
   };

   return (
      <WebSocketContext.Provider value={socket}>
         {children}
      </WebSocketContext.Provider>
   );
}
