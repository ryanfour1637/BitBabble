import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function BytespaceNameDropdown({ userBytespaceArr }) {
   const dispatch = useDispatch();
   const [spaceToDisplay, setSpaceToDisplay] = useState(userBytespaceArr[0]);

   return (
      <div>
         <h1>{spaceToDisplay.name}</h1>
      </div>
   );
}

export default BytespaceNameDropdown;
