import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import CreateBytestreamModal from "./createBytestreamModal";
import JoinBytestreamModal from "./joinBytestreamModal";
import UpdateBytestreamModal from "./updateBytestreamModal";
import LeaveBytestreamModal from "./leaveBytestreamModal";
import DeleteBytestreamModal from "./deleteBytestreamModal";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";
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
   setBytestreamName,
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
   const [activeBytestream, setActiveBytestream] = useState(null);

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

   const onBytestreamClick = (e, bytestream) => {
      e.preventDefault();
      e.stopPropagation();
      setBytestreamId(bytestream.id);
      setActiveBytestream(bytestream.id);
      setBytestreamName(bytestream.name);
   };

   const toggleChannelDropdown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsChannelOpen(!isChannelOpen);
   };

   return (
      <div ref={dropdownRef}>
         <Dropdown show={isOpen} onToggle={() => {}}>
            <Dropdown.Toggle as="div" className="bytestream-name-dropdown">
               {isOpen ? (
                  <BsCaretDownFill
                     style={{ marginRight: "10px", cursor: "pointer" }}
                     onClick={toggle}
                  />
               ) : (
                  <BsCaretRightFill
                     onClick={toggle}
                     style={{ marginRight: "10px", cursor: "pointer" }}
                  />
               )}
               <span onClick={toggleChannelDropdown}>Channels</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="channel-dropdown-open">
               {joinedBytestreams.length > 0
                  ? joinedBytestreams.map((bytestream) => (
                       <div className="channel-dropdown-item-div">
                          <Dropdown.Item
                             key={bytestream.id}
                             className="channel-dropdown-item"
                             onClick={(e) => onBytestreamClick(e, bytestream)}
                             style={{
                                backgroundColor:
                                   activeBytestream == bytestream.id
                                      ? "#5f2565"
                                      : "#371b3a",
                                color:
                                   activeBytestream == bytestream.id
                                      ? "#b9babd"
                                      : "inherit",
                                borderRadius:
                                   activeBytestream == bytestream.id
                                      ? "20px"
                                      : "0px",
                             }}
                          >
                             <FaHashtag style={{ marginRight: "10px" }} />
                             {bytestream.name}
                          </Dropdown.Item>
                       </div>
                    ))
                  : null}
               <div className="channel-dropdown-item-div">
                  <Dropdown.Item className="channel-dropdown-item">
                     <FaHashtag style={{ marginRight: "10px" }} />
                     Add Channels
                  </Dropdown.Item>
               </div>
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
