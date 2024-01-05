import React, { useState } from "react";
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
   const socket = useWebSocket();

   return (
      <Container fluid style={{ height: "100%" }}>
         <Row
            fluid
            style={{ height: "40px" }}
            className="searchbar-chatroom"
         ></Row>
         <Row style={{ height: "100%" }}>
            <Col xxl={1} className="left-nav-bar">
               <Navigation />
            </Col>
            <Col xxl={2} className="workspace-channel">
               <BytespaceNameDropdown />
               <BytestreamNameDropdown
                  setBytestreamId={setBytestreamId}
                  socket={socket}
                  bytestreamId={bytestreamId}
                  user={user}
               />
            </Col>
            <Col>
               <BytestreamChatRoom
                  bytestreamId={bytestreamId}
                  socket={socket}
                  user={user}
               />
            </Col>
         </Row>
      </Container>
   );
}

export default SingleBytespaceLandingPage;
