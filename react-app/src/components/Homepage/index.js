import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import loggedoutimage from "../../images/loggedout-homepage-image.png";

function LoggedOutLandingPage() {
   return (
      <div>
         <div className="loggedout-topdiv">
            <div className="loggedout-topdiv-leftside">
               <p>About this project</p>
               <p>About Me</p>
               <p>Contact me?</p>
            </div>
            <div className="loggedout-topdiv-rightside">
               <OpenModalButton
                  buttonText="Join Now"
                  modalComponent={<SignupFormModal />}
               />
               <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
               />
            </div>
         </div>
         <h1 className="loggedout-midpage">How does BitBabble work?</h1>
         <div className="loggedout-bottompage">
            <div className="loggedout-bottompage-leftside">
               <h2>Getting started with BitBabble</h2>
               <p>
                  As a new user, you can create and manage bytespaces and
                  bytestreams on BitBabble. Sign up as a new user to generate
                  your first bytespace or to join a public one. You can always
                  create another whenever you need one!
               </p>
            </div>
            <img
               src={loggedoutimage}
               alt="bytespaces and bytestreams"
               id="loggedout-image"
            />
         </div>
         <div className="bottom-navbar">
            <p>LinkedIn placeholder</p>
            <p>GitHub placeholder</p>
            <p>download resume placeholder</p>
         </div>
      </div>
   );
}

export default LoggedOutLandingPage;
