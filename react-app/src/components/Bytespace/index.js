import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import ByteSpaceLeftBar from "./BytespaceLeftBar";

function SingleBytespaceLandingPage() {
   return (
      <div>
         <ByteSpaceLeftBar />
      </div>
   );
}

export default SingleBytespaceLandingPage;