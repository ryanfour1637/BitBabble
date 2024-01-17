import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RiEditFill, RiChatDeleteFill } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";

const Toolbar = ({ show }) => {
   return (
      <div className={show ? "show-toolbar" : "hide-toolbar"}>
         <Container>
            <Row>
               <Col xl={10}></Col>
               <Col xl={1}></Col>
               <Col xl={1} className="toolbar-delete">
                  <button>
                     <RiEditFill />
                  </button>
                  <button>
                     <RiChatDeleteFill />
                  </button>
               </Col>
            </Row>
         </Container>
      </div>
   );
};

export default Toolbar;
