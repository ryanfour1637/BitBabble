import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../context/webSocket";
import { actionAddNewMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ messages, bytestreamId }) {
   const dispatch = useDispatch();
   const socket = useWebSocket();
   const [message, setMessage] = useState("");

   useEffect(() => {
      console.log(
         "🚀 ~ file: bytestreamChatRoom.js:15 ~ useEffect ~ socket:",
         socket
      );
      if (socket) {
         socket.on("ws_receive_message", (newMessage) => {
            console.log(
               "🚀 ~ file: bytestreamChatRoom.js:19 ~ socket.on ~ newMessage:",
               newMessage
            );
            dispatch(actionAddNewMessage(newMessage));
         });

         socket.on("user_typing", (data) => {
            console.log(data);
            //may have to set a class or something here to display the typing message via css
         });

         socket.on("user_status_change", (data) => {
            // figure out how to handle this to turn a users status to online or offline
         });

         return () => {
            socket.off("ws_receive_message");
            socket.off("user_typing");
            socket.off("user_status_change");
         };
      }
   }, [socket, dispatch, bytestreamId]);

   const sendMessage = (e) => {
      e.preventDefault();
      if (message === "") return;

      const messageObj = {
         bytestreamId: bytestreamId,
         message: message,
      };

      // Send message to backend
      if (socket) {
         socket.emit("ws_send_message", messageObj);
      }

      // Clear input field
      setMessage("");
   };

   if (Object.keys(messages).length === 0) return null;
   const bytestreamMessages = Object.values(messages[bytestreamId]);
   return (
      <>
         <div className="bytestreamChatRoom-messagesdiv">
            {bytestreamMessages?.map((messageObj) => (
               <div key={messageObj.id} className="bytestreamChatRoom-message">
                  <p>{messageObj.message}</p>
               </div>
            ))}
         </div>
         <div className="bytestreamChatRoom-input">
            <input
               value={message}
               type="text"
               placeholder="Type a message"
               onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" onClick={sendMessage}>
               Send
            </button>
         </div>
      </>
   );
}

export default BytestreamChatRoom;
