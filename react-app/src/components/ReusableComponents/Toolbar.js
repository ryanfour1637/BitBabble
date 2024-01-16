import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Toolbar = ({ show }) => {
   return (
      <div className={show ? "show-toolbar" : "hide-toolbar"}>
         <Container>
            <Row>
               <Col>
                  <button>
                     <FaEdit />
                  </button>
               </Col>
               <Col>
                  <button>
                     <FaTrashAlt />
                  </button>
               </Col>
            </Row>
         </Container>
      </div>
   );
};

export default Toolbar;
