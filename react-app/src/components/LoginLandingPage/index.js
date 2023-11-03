import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { thunkGetAllBytespaces } from "../../store/bytespace_reducer";
import OpenModalButton from "../OpenModalButton";
import JoinBytespaceModal from "../Leftside-Navbar/joinBytespaceModal";

function LoginLandingPage() {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.session.user);
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesArr = Object.values(bytespaces);
   // going to need to filter this for the bytespace list once I have the store built out for bytespaceUsers so that I can show all bytespaces a person is in, not just the ones they started.

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
   }, [dispatch]);

   return (
      <div>
         {bytespacesArr.length > 0 ? (
            bytespacesArr.map((bytespace) => (
               <NavLink to={`/user/${user.id}/bytespaces/${bytespace.id}`}>
                  <h2>{bytespace.name}</h2>
               </NavLink>
            ))
         ) : (
            <div>
               <h2>Interested in joining a public bytespace?? </h2>
               <OpenModalButton
                  buttonText="Join Here!"
                  modalComponent={<JoinBytespaceModal />}
               />
            </div>
         )}
      </div>
   );
}

export default LoginLandingPage;
