import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RiEditFill, RiChatDeleteFill } from "react-icons/ri";
import DeleteMessageModal from "../Bytespace/BytespaceLeftBar/deleteMessageModal";
import "bootstrap/dist/css/bootstrap.min.css";
import OpenModalButton from "../OpenModalButton";

const Toolbar = ({ show, messageObj, socket }) => {
   return (
      <div className={show ? "show-toolbar" : "hide-toolbar"}>
         <Container>
            <Row>
               <Col xl={10}></Col>
               <Col xl={1}></Col>
               <Col xl={1} className="toolbar-delete">
                  <OpenModalButton
                     modalComponent={
                        <DeleteMessageModal
                           messageId={messageObj.id}
                           socket={socket}
                        />
                     }
                     buttonText={<RiChatDeleteFill />}
                  />
               </Col>
            </Row>
         </Container>
      </div>
   );
};

export default Toolbar;
