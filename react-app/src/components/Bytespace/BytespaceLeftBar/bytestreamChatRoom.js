import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { actionAddNewMessage } from "../../../store/messages";
import { thunkGetAllMessages } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ bytestreamId, socket }) {
   const dispatch = useDispatch();

   const messages = useSelector((state) => state.messages);
   const [message, setMessage] = useState("");

   useEffect(() => {
      dispatch(thunkGetAllMessages());
   }, [dispatch]);

   useEffect(() => {
      if (!socket) return;

      socket.on("ws_receive_message", (messageData) => {
         dispatch(actionAddNewMessage(messageData));
      });

      console.log("this is the connected key in join stream", socket.connected);
      socket.on("leave_room_confirm", (data) => {
         console.log("inside leave room");
         const notification = {
            bytestreamId: data.bytestreamId,
            message: `${data.user.username} has left the room`,
         };
         socket.emit("ws_send_message", notification);
      });
      socket.on("join_room_confirm", (data) => {
         const notification = {
            bytestreamId: data.bytestreamId,
            message: `${data.user.username} has joined the room`,
         };
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

   if (bytestreamId == null) {
      return <></>;
   } else {
      return (
         <>
            <div className="bytestreamChatRoom-messagesdiv">
               {allMessagesArr.map((messageObj) => (
                  <div
                     key={messageObj.id}
                     className="bytestreamChatRoom-message"
                  >
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
}

export default BytestreamChatRoom;
