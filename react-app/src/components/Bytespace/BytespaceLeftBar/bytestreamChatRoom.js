import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
   actionAddNewMessage,
   actionDeleteMessage,
} from "../../../store/messages";
import { thunkGetAllMessages } from "../../../store/messages";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

function BytestreamChatRoom({ bytestreamId, socket, user }) {
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
         if (messageData.system === true) {
            messageData.userInfo.username = "BitBabble Bot";
            dispatch(actionAddNewMessage(messageData));
         } else {
            dispatch(actionAddNewMessage(messageData));
         }
      });

      socket.on("join_room_confirm", (data) => {
         const notification = {
            bytestreamId: data.bytestreamId,
            message: `${data.user.username} has joined the room`,
            system: true,
         };
         socket.emit("ws_send_message", notification);
      });

      console.log("socket on delete_message_confirm");
      socket.on("delete_message_confirm", (messageObj) => {
         dispatch(actionDeleteMessage(messageObj));
      });

      return () => {
         socket.off("ws_receive_message");
         socket.off("join_room_confirm");
         socket.off("delete_message_confirm");
      };
   }, [socket, dispatch, bytestreamId]);

   const sendMessage = (e) => {
      e.preventDefault();

      const messageObj = {
         bytestreamId: bytestreamId,
         message: message,
         system: false,
      };

      socket.emit("ws_send_message", messageObj);

      setMessage("");
   };

   const deleteMessage = (e) => {
      e.preventDefault();

      const messageId = e.target.value;

      socket.emit("ws_delete_message", messageId);
   };
   const updateMessage = (e) => {};

   const getTimeZone = () => {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
   };

   const formatTimestamp = (timestamp) => {
      const correctTimestamp = timestamp + "Z";
      return new Date(correctTimestamp).toLocaleTimeString("en-US", {
         timeZone: getTimeZone(),
         hour12: true,
      });
   };

   const allMessagesArr =
      messages[bytestreamId] && Object.values(messages[bytestreamId]).length > 0
         ? Object.values(messages[bytestreamId])
         : [];

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
                     {messageObj.system === true ? (
                        <span className="message-username">BitBabble Bot:</span>
                     ) : (
                        <span className="message-username">
                           {messageObj.userInfo.username}
                        </span>
                     )}
                     <span className="message-text">{messageObj.message}</span>
                     <span className="message-timestamp">
                        {formatTimestamp(messageObj.timestamp)}
                     </span>
                     {messageObj.userInfo.id == user.id &&
                     messageObj.system !== true ? (
                        <span>
                           <button
                              className="message-delete"
                              value={messageObj.id}
                              onClick={deleteMessage}
                           >
                              Delete
                           </button>
                        </span>
                     ) : null}
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
