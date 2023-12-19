import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../context/webSocket";
import { actionAddNewMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ messages, bytestreamId }) {
   const dispatch = useDispatch();
   const socket = useWebSocket();
   const [message, setMessage] = useState("");

   console.log(
      "🚀 ~ file: bytestreamChatRoom.js:10 ~ BytestreamChatRoom ~ socket:",
      socket
   );
   useEffect(() => {
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

   return (
      <div className="bytestreamChatRoom">
         <div className="bytestreamChatRoom__messages">
            {messages?.map((message) => (
               <div key={message.id} className="bytestreamChatRoom__message">
                  <p>{message.message}</p>
               </div>
            ))}
         </div>
         <div className="bytestreamChatRoom__input">
            <input
               type="text"
               placeholder="Type a message"
               onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" onClick={sendMessage}>
               Send
            </button>
         </div>
      </div>
   );
}

export default BytestreamChatRoom;
