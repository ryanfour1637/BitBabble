import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
   actionAddNewMessage,
   actionDeleteMessage,
} from "../../../store/messages";
import { thunkGetAllMessages } from "../../../store/messages";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaHashtag } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import useDropdownToggle from "../../ReusableComponents/DropdownToggle";
import { BsPersonCircle } from "react-icons/bs";

function BytestreamChatRoom({ bytestreamId, socket, user, bytestreamName }) {
   const dispatch = useDispatch();

   const messages = useSelector((state) => state.messages);
   const [message, setMessage] = useState("");
   const messagesContainerRef = useRef(null);
   const [loading, setLoading] = useState(true);

   // understand this better so you can fix it bc its not working anymore and i cant figure out what I did.
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

      socket.on("update_message_confirm", (messageObj) => {
         actionAddNewMessage(messageObj);
      });

      socket.on("delete_message_confirm", (messageObj) => {
         dispatch(actionDeleteMessage(messageObj));
      });

      return () => {
         socket.off("ws_receive_message");
         socket.off("join_room_confirm");
         socket.off("delete_message_confirm");
         socket.off("update_message_confirm");
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

   const updateMessage = (e) => {
      e.preventDefault();
   };
   const deleteMessage = (e) => {
      e.preventDefault();

      const messageId = e.target.value;

      socket.emit("ws_delete_message", messageId);
   };

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
            <Container fluid style={{ height: "100%", width: "100%" }}>
               <Row fluid className="chatroom-topbar" xxl={1}>
                  <Dropdown>
                     <Dropdown.Toggle
                        as="div"
                        className="chatroom-channel-name-dropdown"
                     >
                        <FaHashtag style={{ marginRight: "10px" }} />
                        {bytestreamName}
                     </Dropdown.Toggle>
                     <Dropdown.Menu className="chatroom-channel-name-dropdown-open">
                        <Dropdown.Item>
                           {"Placeholder for Edit Name"}
                        </Dropdown.Item>
                        <Dropdown.Item>
                           {"Placeholder for Leave channel"}
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </Row>
               <Row fluid className="chatroom-display" xxl={9}>
                  {allMessagesArr.map((messageObj) => (
                     <Row className="chatroom-display-message-div">
                        <Col className="message-user-icon-div">
                           <BsPersonCircle className="message-user-icon" />
                        </Col>
                        <Col className="message-username-time-div">
                           <Row className="username-time-div">
                              <Col className="username-div">
                                 {messageObj.userInfo.username}
                              </Col>
                              <Col className="time-div">
                                 {formatTimestamp(messageObj.timestamp)}
                              </Col>
                           </Row>
                           <Row className="message-div">
                              {messageObj.message}
                           </Row>
                        </Col>
                     </Row>
                  ))}
               </Row>
               <Row fluid className="chatroom-input" xxl={2}>
                  {"Placeholder for input box component"}
               </Row>
            </Container>
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
                     {messageObj.userInfo.id == user.id &&
                     messageObj.system !== true ? (
                        <span>
                           <button
                              className="message-update"
                              value={messageObj.id}
                              onClick={updateMessage}
                           >
                              Update
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
