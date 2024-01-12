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

function Navigation({
   closeChannelDropdown,
   showNavDropdown,
   setShowNavDropdown,
   setShowWorkspaceDropdown,
}) {
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      dispatch(authenticate()).then(() => setIsLoaded(true));
   }, [dispatch]);

   return (
      <>
         <Row style={{ height: "100%" }}>
            <Col>
               <NavLink exact to="/" className="homeicon-css">
                  <img src={homeicon} alt="home" />
               </NavLink>
               {sessionUser ? (
                  <LeftsideNav
                     closeChannelDropdown={closeChannelDropdown}
                     showNavDropdown={showNavDropdown}
                     setShowNavDropdown={setShowNavDropdown}
                     setShowWorkspaceDropdown={setShowWorkspaceDropdown}
                  />
               ) : null}
               {isLoaded ? (
                  <ProfileButton user={sessionUser} logoutClass="personicon" />
               ) : null}
            </Col>
         </Row>
      </>
   );
}

export default Navigation;
