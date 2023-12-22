import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { actionAddNewMessage } from "../../../store/messages";
import { thunkGetAllMessages } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ bytestreamId, socket }) {
   const dispatch = useDispatch();

   const messages = useSelector((state) => state.messages);
   const [message, setMessage] = useState("");
   const messagesContainerRef = useRef(null);
   const [loading, setLoading] = useState(true);
   function scrollToBottom() {
      if (messagesContainerRef.current) {
         const { scrollHeight, clientHeight } = messagesContainerRef.current;
         messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
      }
   }

   useEffect(() => {
      dispatch(thunkGetAllMessages());
   }, [dispatch]);

   useEffect(() => {
      if (!loading) {
         scrollToBottom();
      }
   }, [messages, loading]);

   useEffect(() => {
      if (!socket) return;

      socket.on("ws_receive_message", (messageData) => {
         console.log(
            "🚀 ~ file: bytestreamChatRoom.js:35 ~ socket.on ~ messageData:",
            messageData
         );
         if (messageData.system === true) {
            messageData.userInfo.username = "BitBabble Bot";
            dispatch(actionAddNewMessage(messageData));
         } else {
            dispatch(actionAddNewMessage(messageData));
         }
      });

      socket.on("join_room_confirm", (data) => {
         console.log(
            "🚀 ~ file: bytestreamChatRoom.js:48 ~ socket.on ~ data:",
            data
         );
         const notification = {
            bytestreamId: data.bytestreamId,
            message: `${data.user.username} has joined the room`,
            system: true,
         };
         console.log(
            "🚀 ~ file: bytestreamChatRoom.js:57 ~ socket.on ~ notification:",
            notification
         );
         socket.emit("ws_send_message", notification);
      });

      return () => {
         socket.off("ws_receive_message");
         socket.off("join_room_confirm");
         socket.off("leave_room_confirm");
      };

      // maybe add messages to the dependency array
   }, [socket, dispatch, bytestreamId]);

   const sendMessage = (e) => {
      e.preventDefault();

      const messageObj = {
         bytestreamId: bytestreamId,
         message: message,
         system: false,
      };

      // Send message to backend
      console.log("socket on??", socket.connected);
      socket.emit("ws_send_message", messageObj);

      // Clear input field
      setMessage("");
   };
   const formatTimestamp = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString();
   };
   const allMessagesArr =
      messages[bytestreamId] && Object.values(messages[bytestreamId]).length > 0
         ? Object.values(messages[bytestreamId])
         : [];

   console.log("all messages arr", allMessagesArr);

   if (bytestreamId == null) {
      return <></>;
   } else {
      return (
         <>
            <div
               className="bytestreamChatRoom-messagesdiv"
               ref={messagesContainerRef}
            >
               {allMessagesArr.map((messageObj) => (
                  <div
                     key={messageObj.id}
                     className="bytestreamChatRoom-message"
                  >
                     <span className="message-username">
                        {messageObj.userInfo.username}:
                     </span>
                     <span className="message-text">{messageObj.message}</span>
                     <span className="message-timestamp">
                        {formatTimestamp(messageObj.timestamp)}
                     </span>
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
}

export default BytestreamChatRoom;
