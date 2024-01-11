import React, { useState, useRef } from "react";
import BytestreamNameDropdown from "./BytespaceLeftBar/bytestreamDropDown";
import BytespaceNameDropdown from "./BytespaceLeftBar/nameDropDown";
import BytestreamChatRoom from "./BytespaceLeftBar/bytestreamChatRoom";
import { useWebSocket } from "../../context/webSocket";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./singlebytespace.css";

function SingleBytespaceLandingPage({ user }) {
   const [bytestreamId, setBytestreamId] = useState(null);
   const [bytestreamName, setBytestreamName] = useState(null);
   const [isChannelOpen, setIsChannelOpen] = useState(false);
   const [showNavDropdown, setShowNavDropdown] = useState(false);
   const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
   const socket = useWebSocket();
   const messagesContainerRef = useRef(null);

   const toggleChannelDropdown = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isChannelOpen) {
         setIsChannelOpen(false);
      } else {
         setIsChannelOpen(true);
         setShowNavDropdown(false);
      }
   };

   const closeChannelDropdown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsChannelOpen(false);
   };

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
         <Row className="for-margin-right">
            <Col xxl={3} className="h-100">
               <Row>
                  <Col xxl={2} className="left-nav-bar">
                     <Navigation
                        closeChannelDropdown={closeChannelDropdown}
                        showNavDropdown={showNavDropdown}
                        setShowNavDropdown={setShowNavDropdown}
                        setShowWorkspaceDropdown={setShowWorkspaceDropdown}
                     />
                  </Col>
                  <Col xxl={10} className="workspace-channel">
                     <BytespaceNameDropdown
                        closeChannelDropdown={closeChannelDropdown}
                        showWorkspaceDropdown={showWorkspaceDropdown}
                        setShowWorkspaceDropdown={setShowWorkspaceDropdown}
                        setShowNavDropdown={setShowNavDropdown}
                     />
                     <BytestreamNameDropdown
                        setBytestreamId={setBytestreamId}
                        socket={socket}
                        bytestreamId={bytestreamId}
                        user={user}
                        setBytestreamName={setBytestreamName}
                        toggleChannelDropdown={toggleChannelDropdown}
                        isChannelOpen={isChannelOpen}
                        setShowNavDropdown={setShowNavDropdown}
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
                  setBytestreamName={setBytestreamName}
               />
            </Col>
         </Row>
      </Container>
   );
}

export default SingleBytespaceLandingPage;
