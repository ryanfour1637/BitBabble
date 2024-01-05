import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LeftsideNav from "../Leftside-Navbar";
import homeicon from "../../images/homeicon.png";
import "./Navigation.css";
import { authenticate } from "../../store/session";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Navigation() {
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      dispatch(authenticate()).then(() => setIsLoaded(true));
   }, [dispatch]);

   return (
      <Container fluid style={{ height: "100%" }}>
         <Row style={{ height: "95%" }}>
            <Col style={{ height: "10%" }}>
               <NavLink exact to="/">
                  <img src={homeicon} alt="home" />
               </NavLink>
               {sessionUser ? <LeftsideNav /> : null}
            </Col>
         </Row>
         {isLoaded ? (
            <Row>
               <Col>
                  <ProfileButton user={sessionUser} />
               </Col>
            </Row>
         ) : null}
      </Container>
   );
}

export default Navigation;
