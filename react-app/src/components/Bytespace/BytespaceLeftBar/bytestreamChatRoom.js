import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../context/webSocket";
import { actionAddNewMessage } from "../../../store/messages";
import { thunkGetAllMessages } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ bytestreamId }) {
   const dispatch = useDispatch();
   const socket = useWebSocket();
   const messages = useSelector((state) => state.messages);
   const [message, setMessage] = useState("");
   const [typing, setTyping] = useState(false);

   useEffect(() => {
      dispatch(thunkGetAllMessages());
   }, [dispatch]);

   useEffect(() => {
      if (!socket) return;
      console.log("this is the connected key", socket.connected);

      socket.on("ws_receive_message", (messageData) => {
         dispatch(actionAddNewMessage(messageData));
      });

      return () => {
         socket.off("ws_receive_message");
      };

      // maybe add messages to the dependency array
   }, [socket, dispatch, bytestreamId]);

   const sendMessage = (e) => {
      e.preventDefault();

      const messageObj = {
         bytestreamId: bytestreamId,
         message: message,
      };

      // Send message to backend
      console.log("socket on??", socket.connected);
      socket.emit("ws_send_message", messageObj);

      // Clear input field
      setMessage("");
   };

   const allMessagesArr =
      messages[bytestreamId] && Object.values(messages[bytestreamId]).length > 0
         ? Object.values(messages[bytestreamId])
         : [];
   return (
      <>
         <div className="bytestreamChatRoom-messagesdiv">
            {allMessagesArr.map((messageObj) => (
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
