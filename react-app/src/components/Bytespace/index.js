import React, { useState, useRef } from "react";
import BytestreamNameDropdown from "./BytespaceLeftBar/bytestreamDropDown";
import BytespaceNameDropdown from "./BytespaceLeftBar/nameDropDown";
import BytestreamChatRoom from "./BytespaceLeftBar/bytestreamChatRoom";
import { useWebSocket } from "../../context/webSocket";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./singlebytespace.css";

function SingleBytespaceLandingPage({ user }) {
   const [bytestreamId, setBytestreamId] = useState(null);
   const [bytestreamName, setBytestreamName] = useState(null);
   const socket = useWebSocket();
   const messagesContainerRef = useRef(null);

   function scrollToBottom() {
      if (messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
      }
   }

   return (
      <Container fluid className="h-100">
         <Row
            fluid
            style={{ height: "40px", margin: 0, padding: 0 }}
            className="searchbar-chatroom"
         ></Row>
         <Row>
            <Col xxl={3} className="h-100">
               <Row>
                  <Col xxl={2} className="left-nav-bar">
                     <Navigation />
                  </Col>
                  <Col xxl={10} className="workspace-channel">
                     <BytespaceNameDropdown />
                     <BytestreamNameDropdown
                        setBytestreamId={setBytestreamId}
                        socket={socket}
                        bytestreamId={bytestreamId}
                        user={user}
                        setBytestreamName={setBytestreamName}
                     />
                  </Col>
               </Row>
            </Col>
            <Col xxl={9} className="chatroom-outer-div">
               <BytestreamChatRoom
                  bytestreamId={bytestreamId}
                  socket={socket}
                  user={user}
                  bytestreamName={bytestreamName}
                  scrollToBottom={scrollToBottom}
                  messagesContainerRef={messagesContainerRef}
               />
            </Col>
         </Row>
      </Container>
   );
}

export default SingleBytespaceLandingPage;
