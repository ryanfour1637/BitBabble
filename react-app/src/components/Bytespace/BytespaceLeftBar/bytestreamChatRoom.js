import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
   actionAddNewMessage,
   actionDeleteMessage,
} from "../../../store/messages";
import { thunkGetAllMessages } from "../../../store/messages";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FaHashtag, FaChevronDown } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import ChatInputBox from "./chatInputBox";
import UpdateBytestreamModal from "./updateBytestreamModal";
import OpenModalButton from "../../OpenModalButton";
import LeaveBytestreamModal from "./leaveBytestreamModal";
import DeleteBytestreamModal from "./deleteBytestreamModal";
import Message from "./messages";

function BytestreamChatRoom({
   setBytestreamId,
   bytestreamId,
   socket,
   user,
   bytestreamName,
   scrollToBottom,
   messagesContainerRef,
   setBytestreamName,
   bytestream,
   channelMemberId,
}) {
   const dispatch = useDispatch();
   const messages = useSelector((state) => state.messages);
   const [message, setMessage] = useState("");

   useEffect(() => {
      dispatch(thunkGetAllMessages());
   }, [dispatch]);

   useEffect(() => {}, [bytestreamName]);

   useEffect(() => {
      scrollToBottom();
   }, [messages, scrollToBottom]);

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
         dispatch(actionAddNewMessage(messageObj));
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

   const sendWithEnter = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         sendMessage(e);
      }
   };

   const toLowerCase = (string) => {
      return string?.toLowerCase();
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
            <Container fluid className="h-100">
               <Row className="chatroom-topbar">
                  <Col xxl={12}>
                     <Dropdown className="bytestream-chatroom-dropdown">
                        <Dropdown.Toggle
                           as="div"
                           className="chatroom-channel-name-dropdown"
                        >
                           <FaHashtag
                              style={{
                                 marginRight: "2px",
                                 height: "14.45px",
                                 width: "14.45px",
                              }}
                           />
                           {toLowerCase(bytestreamName)}
                           <FaChevronDown
                              style={{
                                 marginLeft: "3px",
                                 width: "10px",
                                 height: "10px",
                              }}
                           />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="chatroom-channel-dropdown-background">
                           <Dropdown.Item as="button" className="update-button">
                              <OpenModalButton
                                 modalComponent={
                                    <UpdateBytestreamModal
                                       bytestreamId={bytestreamId}
                                       bytestreamName={bytestreamName}
                                       setBytestreamName={setBytestreamName}
                                    />
                                 }
                                 buttonText="Update Channel"
                              />
                           </Dropdown.Item>
                           <Dropdown.Item as="button" className="leave-button">
                              <OpenModalButton
                                 modalComponent={
                                    <LeaveBytestreamModal
                                       socket={socket}
                                       setBytestreamId={setBytestreamId}
                                       bytestreamId={bytestreamId}
                                       user={user}
                                       leaveCSS="leave-outerdiv"
                                       channelMemberId={channelMemberId}
                                    />
                                 }
                                 buttonText="Leave Channel"
                              />
                           </Dropdown.Item>
                           {bytestream?.ownerId == user.id && (
                              <Dropdown.Item
                                 as="button"
                                 className="delete-button"
                              >
                                 <OpenModalButton
                                    modalComponent={
                                       <DeleteBytestreamModal
                                          bytestream={bytestream}
                                          setBytestreamId={setBytestreamId}
                                          deleteCSS="delete-outerdiv"
                                       />
                                    }
                                    buttonText="Delete Channel"
                                 />
                              </Dropdown.Item>
                           )}
                        </Dropdown.Menu>
                     </Dropdown>
                  </Col>
               </Row>
               <Row className="chatroom-display">
                  <Col
                     ref={messagesContainerRef}
                     className="h-100 chatroom-container"
                  >
                     {allMessagesArr.map((messageObj) => (
                        <Message
                           key={messageObj.id}
                           messageObj={messageObj}
                           socket={socket}
                           user={user}
                        />
                     ))}
                  </Col>
               </Row>
               <Row className="chatroom-input">
                  <Col className="chatroom-input-column">
                     <ChatInputBox
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                        bytestreamName={bytestreamName}
                        sendWithEnter={sendWithEnter}
                     />
                  </Col>
               </Row>
            </Container>
         </>
      );
   }
}

export default BytestreamChatRoom;
