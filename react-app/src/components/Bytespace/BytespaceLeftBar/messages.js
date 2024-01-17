import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BsPersonSquare } from "react-icons/bs";
import Toolbar from "../../ReusableComponents/Toolbar";

const Message = ({ messageObj, socket }) => {
   const [showEditDelete, setShowEditDelete] = useState(false);

   const toLowerCase = (string) => {
      return string?.toLowerCase();
   };

   const getTimeZone = () => {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
   };

   const formatTimestamp = (timestamp) => {
      const correctTimestamp = timestamp + "Z";
      return new Date(correctTimestamp).toLocaleTimeString("en-US", {
         timeZone: getTimeZone(),
         hour12: true,
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   return (
      <Row
         className="chatroom-display-message-div"
         onMouseEnter={() => setShowEditDelete(true)}
         onMouseLeave={() => setShowEditDelete(false)}
      >
         <Col xxl={1} className="message-div-person">
            <BsPersonSquare />
         </Col>
         <Col xxl={11} className="message-username-time-div">
            <Row className="username-time-div">
               <span className="message-username">
                  {toLowerCase(messageObj.userInfo.username)}
               </span>
               <span className="message-time">
                  {formatTimestamp(messageObj.timestamp)}
               </span>
            </Row>
            <Row className="message-div">
               <span className="message-text">{messageObj.message}</span>
            </Row>
         </Col>
         <Toolbar
            show={showEditDelete}
            messageObj={messageObj}
            socket={socket}
         />
      </Row>
   );
};

export default Message;
