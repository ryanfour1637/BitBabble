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
      <Dropdown className="left-nav-workspace-dropdown-button">
         <Dropdown.Toggle
            as="img"
            src={bytespaceimg}
            alt="logo"
            id="imageDropdown"
            role="button"
            className="group-button-nav"
         />
         <Dropdown.Menu className="workspace-dropdown-menu">
            <Dropdown.Item as="button">
               <OpenModalButton
                  buttonText="Join Workspace"
                  modalComponent={<JoinBytespaceModal userId={user.id} />}
               />
            </Dropdown.Item>
            <Dropdown.Item as="button">
               <OpenModalButton
                  buttonText="Create Workspace"
                  modalComponent={<CreateBytespaceModal userId={user.id} />}
               />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}

export default ByteSpaceDropdown;
