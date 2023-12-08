import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LeftsideNav from "../Leftside-Navbar";
import homeicon from "../../images/homeicon.png";
import "./Navigation.css";
import { authenticate } from "../../store/session";

function Navigation() {
   const dispatch = useDispatch();
   const sessionUser = useSelector((state) => state.session.user);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      dispatch(authenticate()).then(() => setIsLoaded(true));
   }, [dispatch]);

   return (
      <div className="left-nav">
         <div className="left-nav-topdiv">
            <NavLink exact to="/">
               <img src={homeicon} alt="home" />
            </NavLink>
            {sessionUser && <LeftsideNav />}
         </div>
         {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
   );
}

export default Navigation;
