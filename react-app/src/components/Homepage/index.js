import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import loggedoutimage from "../../images/loggedout-homepage-image.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./homepage.css";

function LoggedOutLandingPage() {
   return (
      <Container fluid className="h-100 loggedout-wholepage">
         <Row className="homepage-toprow">
            <Col col={6}>
               <Row>
                  <Col className="homepage-topdiv-rightside">
                     <OpenModalButton
                        buttonText="About Project"
                        modalComponent={<SignupFormModal />}
                     />
                  </Col>
                  <Col className="homepage-topdiv-rightside">
                     <OpenModalButton
                        buttonText="About Me"
                        modalComponent={<SignupFormModal />}
                     />
                  </Col>
               </Row>
            </Col>
            <Col col={6}>
               <Row>
                  <Col className="homepage-topdiv-rightside">
                     <OpenModalButton
                        buttonText="Join Now"
                        modalComponent={<SignupFormModal />}
                     />
                  </Col>
                  <Col className="homepage-topdiv-rightside">
                     <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                     />
                  </Col>
               </Row>
            </Col>
         </Row>
         <Row className="homepage-h1">
            <h1>How does BitBabble work?</h1>
         </Row>
         <Row className="homepage-h2-img">
            <Col col={6}>
               <Row className="homepage-midleft">
                  <h2>Getting started with BitBabble</h2>
                  <p>
                     {" "}
                     As a new user, you can create and manage workspaces and
                     channels on BitBabble. Sign up as a new user to generate
                     your first workspace or to join a public one. You can
                     always create another whenever you need one!
                  </p>
               </Row>
            </Col>
            <Col col={6}>
               <Row className="homepage-midright">
                  <img
                     src={loggedoutimage}
                     alt="bytespaces and bytestreams"
                     id="loggedout-image"
                  />
               </Row>
            </Col>
         </Row>
         <Row className="homepage-footer">
            <p className="bottom-footer-tags">LinkedIn placeholder</p>
            <p className="bottom-footer-tags">GitHub placeholder</p>
            <p className="bottom-footer-tags">download resume placeholder</p>
         </Row>
      </Container>
   );
}

export default LoggedOutLandingPage;
