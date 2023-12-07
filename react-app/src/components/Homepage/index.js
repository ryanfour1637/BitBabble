import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import loggedoutimage from "../../images/loggedout-homepage-image.png";
import "./homepage.css";

function LoggedOutLandingPage() {
   return (
      <div className="loggedout-wholepage">
         <div className="loggedout-topdiv">
            <div className="loggedout-topdiv-leftside">
               <p className="loggedout-topdiv-leftside-links">
                  About this project
               </p>
               <p className="loggedout-topdiv-leftside-links">About Me</p>
               <p className="loggedout-topdiv-leftside-links">Contact me?</p>
            </div>
            <div className="loggedout-topdiv-rightside">
               <OpenModalButton
                  className="joinNowButton"
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
               <h2 className="loggedout-bottompage-leftside-gettingstarted">
                  Getting started with BitBabble
               </h2>
               <p className="loggedout-bottompage-leftside-paragraph">
                  As a new user, you can create and manage bytespaces and
                  bytestreams on BitBabble. Sign up as a new user to generate
                  your first bytespace or to join a public one. You can always
                  create another whenever you need one!
               </p>
            </div>
            <div className="loggedout-bottompage-rightside">
               <img
                  src={loggedoutimage}
                  alt="bytespaces and bytestreams"
                  id="loggedout-image"
               />
            </div>
         </div>
         <div className="bottom-footer">
            <p className="bottom-footer-tags">LinkedIn placeholder</p>
            <p className="bottom-footer-tags">GitHub placeholder</p>
            <p className="bottom-footer-tags">download resume placeholder</p>
         </div>
      </div>
   );
}

export default LoggedOutLandingPage;
