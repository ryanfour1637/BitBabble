import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import JoinBytespaceModal from "./joinBytespaceModal";
import CreateBytespaceModal from "./createBytespaceModel";
import bytespaceimg from "../../images/bytespaceimage.png";
import { Dropdown } from "react-bootstrap";

function ByteSpaceDropdown() {
   const user = useSelector((state) => state.session.user);

   return (
      <Dropdown>
         <Dropdown.Toggle
            as="img"
            src={bytespaceimg}
            alt="logo"
            id="imageDropdown"
            role="button"
         />
         <Dropdown.Menu>
            <Dropdown.Item as="button">
               <OpenModalButton
                  buttonText="Join new bytespace"
                  modalComponent={<JoinBytespaceModal userId={user.id} />}
               />
            </Dropdown.Item>
            <Dropdown.Item as="button">
               <OpenModalButton
                  buttonText="Create new bytespace"
                  modalComponent={<CreateBytespaceModal userId={user.id} />}
               />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default ByteSpaceDropdown;
