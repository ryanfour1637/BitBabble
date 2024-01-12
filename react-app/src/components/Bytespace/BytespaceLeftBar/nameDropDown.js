import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import UpdateBytespaceModal from "./updateBytespace";
import DeleteBytespaceModal from "./deleteBytespaceModal";
import LeaveBytespaceModal from "./leaveBytespaceModal";
import { thunkGetAllBytespaces } from "../../../store/bytespace";
import { thunkGetAllMembers } from "../../../store/bytespace_members";
import { Dropdown } from "react-bootstrap";

function BytespaceNameDropdown({
   closeChannelDropdown,
   showWorkspaceDropdown,
   setShowWorkspaceDropdown,
   setShowNavDropdown,
}) {
   const dispatch = useDispatch();
   const { userId, bytespaceId } = useParams();
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesArr = Object.values(bytespaces);
   const bytespacesMembershipRosters = useSelector(
      (state) => state.bytespaceMembers
   );
   const singleBytespace = bytespacesArr.filter(
      (bytespace) => bytespace.id == bytespaceId
   );
   const bytespaceObj = singleBytespace[0];

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
      dispatch(thunkGetAllMembers());
   }, [dispatch]);

   if (bytespaceObj == undefined) return null;
   if (
      bytespacesMembershipRosters == undefined ||
      Object.values(bytespacesMembershipRosters).length === 0
   )
      return null;

   const memberIdToDelete = bytespacesMembershipRosters[bytespaceId][userId];

   const workspaceDropdownClicked = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (showWorkspaceDropdown) {
         setShowWorkspaceDropdown(false);
      } else {
         setShowWorkspaceDropdown(true);
         setShowNavDropdown(false);
         closeChannelDropdown(e);
      }
   };

   return (
      <>
         <Dropdown
            onClick={workspaceDropdownClicked}
            show={showWorkspaceDropdown}
            className="left-nav-workspace-dropdown-button"
         >
            <Dropdown.Toggle as="span" className="bytespace-name-words">
               {bytespaceObj.name}
               <Dropdown.Menu className="workspace-dropdown-menu">
                  {userId == bytespaceObj.ownerId && (
                     <>
                        <Dropdown.Item as="button">
                           <OpenModalButton
                              buttonText="Update Workspace"
                              modalComponent={
                                 <UpdateBytespaceModal
                                    bytespaceObj={bytespaceObj}
                                 />
                              }
                           />
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                           <OpenModalButton
                              buttonText="Delete Workspace"
                              modalComponent={
                                 <DeleteBytespaceModal
                                    bytespaceId={bytespaceId}
                                    deleteCSSClass="delete-outerdiv"
                                 />
                              }
                           />
                        </Dropdown.Item>
                     </>
                  )}

                  {userId != bytespaceObj.ownerId && (
                     <Dropdown.Item as="button">
                        <OpenModalButton
                           buttonText="Leave Workspace"
                           modalComponent={
                              <LeaveBytespaceModal
                                 idToDelete={memberIdToDelete}
                                 leaveCSS="leave-outerdiv"
                              />
                           }
                        />
                     </Dropdown.Item>
                  )}
               </Dropdown.Menu>
            </Dropdown.Toggle>
         </Dropdown>
      </>
   );
}

export default BytespaceNameDropdown;
