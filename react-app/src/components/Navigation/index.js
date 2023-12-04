import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LeftsideNav from "../Leftside-Navbar";
import "./Navigation.css";

function Navigation({ isLoaded }) {
   const sessionUser = useSelector((state) => state.session.user);

   return (
      <ul>
         <li>
            <NavLink exact to="/bytespaces">
               Home
            </NavLink>
         </li>
         {isLoaded && (
            <li>
               <ProfileButton user={sessionUser} />
            </li>
         )}
         {sessionUser && (
            <li>
               <LeftsideNav />
            </li>
         )}
      </ul>
   );
}

export default Navigation;
