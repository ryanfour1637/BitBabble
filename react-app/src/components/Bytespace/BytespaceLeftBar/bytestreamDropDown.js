import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import CreateBytestreamModal from "./createBytestreamModal";
import JoinBytestreamModal from "./joinBytestreamModal";
import UpdateBytestreamModal from "./updateBytestreamModal";
import LeaveBytestreamModal from "./leaveBytestreamModal";
import DeleteBytestreamModal from "./deleteBytestreamModal";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";
import { useRightClickMenu } from "../../../context/rightClick";
import xmark from "../../../images/xmark.png";
import Dropdown from "react-bootstrap/Dropdown";
import { BsCaretRightFill, BsCaretDownFill } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import useDropdownToggle from "../../ReusableComponents/DropdownToggle";

function BytestreamNameDropdown({
   setBytestreamId,
   socket,
   bytestreamId,
   user,
}) {
   const dispatch = useDispatch();
   const { userId, bytespaceId } = useParams();
   const bytestreams = useSelector((state) => state.bytestreams);
   const bytestreamsMembershipRosters = useSelector(
      (state) => state.bytestreamMembers
   );
   const [isOpen, toggle] = useDropdownToggle();
   const dropdownRef = useRef(null);
   const [isChannelOpen, setIsChannelOpen] = useState(false);

   useEffect(() => {
      dispatch(thunkGetAllBytestreams());
      dispatch(thunkGetAllBytestreamMembers());
   }, [dispatch]);

   const handleClickOutsideChannelsDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
         e.stopPropagation();
      }
   };
   useEffect(() => {
      document.addEventListener(
         "mousedown",
         handleClickOutsideChannelsDropdown
      );
      return () => {
         document.removeEventListener(
            "mousedown",
            handleClickOutsideChannelsDropdown
         );
      };
   }, []);

   if (bytestreams == undefined || Object.values(bytestreams).length === 0)
      return null;
   if (
      bytestreamsMembershipRosters == undefined ||
      Object.values(bytestreamsMembershipRosters).length === 0
   )
      return null;

   const joinedBytestreams = [];
   const nonJoinedBytestreams = [];

   const thisBytespacesBytestreams = bytestreams[bytespaceId];

   if (thisBytespacesBytestreams !== undefined) {
      Object.keys(thisBytespacesBytestreams).forEach((bytestreamId) => {
         const bytestream = bytestreams[bytespaceId][bytestreamId];

         if (
            bytestreamsMembershipRosters[bytespaceId] &&
            bytestreamsMembershipRosters[bytespaceId][bytestreamId] &&
            bytestreamsMembershipRosters[bytespaceId][bytestreamId][userId]
         ) {
            joinedBytestreams.push(bytestream);
         } else {
            nonJoinedBytestreams.push(bytestream);
         }
      });
   }

   const onBytestreamClick = (e, bytestreamId) => {
      e.stopPropagation();
      setBytestreamId(bytestreamId);
   };

   const toggleChannelDropdown = (e) => {
      e.stopPropagation();
      setIsChannelOpen(!isChannelOpen);
   };

   return (
      <div ref={dropdownRef}>
         <Dropdown show={isOpen} onToggle={() => {}}>
            <Dropdown.Toggle as="div" className="bytestream-name-dropdown">
               {isOpen ? (
                  <BsCaretDownFill
                     style={{ marginRight: "10px" }}
                     onClick={toggle}
                  />
               ) : (
                  <BsCaretRightFill
                     onClick={toggle}
                     style={{ marginRight: "10px" }}
                  />
               )}
               <span onClick={toggleChannelDropdown}>Channels</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
               {joinedBytestreams.length > 0
                  ? joinedBytestreams.map((bytestream) => (
                       <Dropdown.Item
                          key={bytestream.id}
                          className="channel-dropdown-item"
                          onClick={(e) => onBytestreamClick(e, bytestream.id)}
                       >
                          <FaHashtag style={{ marginRight: "10px" }} />
                          {bytestream.name}
                       </Dropdown.Item>
                    ))
                  : null}
               <Dropdown.Item>
                  <FaHashtag style={{ marginRight: "10px" }} />
                  Add Channels
               </Dropdown.Item>
            </Dropdown.Menu>
         </Dropdown>
         {isChannelOpen && (
            <div className="join-add-channel-dropdown">
               <OpenModalButton
                  modalComponent={
                     <JoinBytestreamModal
                        nonJoinedBytestreamsToDisplay={nonJoinedBytestreams}
                        bytespaceId={bytespaceId}
                        socket={socket}
                        setBytestreamId={setBytestreamId}
                     />
                  }
                  buttonText="Join Channel"
                  onButtonClick={toggleChannelDropdown}
               />
               <OpenModalButton
                  modalComponent={
                     <CreateBytestreamModal
                        bytespaceId={bytespaceId}
                        socket={socket}
                        setBytestreamId={setBytestreamId}
                     />
                  }
                  buttonText="Create Channel"
                  onButtonClick={toggleChannelDropdown}
               />
            </div>
         )}
      </div>
   );
}

export default BytestreamNameDropdown;
