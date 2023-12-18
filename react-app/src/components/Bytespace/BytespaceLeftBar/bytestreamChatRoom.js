import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../context/webSocket";
import { thunkAddNewMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ messages, bytestreamId }) {
   console.log(
      "🚀 ~ file: bytestreamChatRoom.js:8 ~ BytestreamChatRoom ~ messages:",
      messages
   );
   const dispatch = useDispatch();
   const socket = useWebSocket();

   const [message, setMessage] = useState("");

   const sendMessage = (e) => {
      e.preventDefault();
      if (message === "") return;

      const messageObj = {
         bytestreamId: bytestreamId,
         message: message,
      };

      if (socket) {
      }

      // Send message to backend
      dispatch(thunkAddNewMessage(messageObj));
      // Clear input field
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
