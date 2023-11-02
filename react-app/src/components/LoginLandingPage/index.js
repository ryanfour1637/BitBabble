import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { thunkGetAllBytespaces } from "../../store/bytespace_reducer";
import OpenModalButton from "../OpenModalButton";
import JoinBytespaceModal from "../Leftside-Navbar/joinBytespaceModal";

function LoginLandingPage() {
   const dispatch = useDispatch();
   const { userId } = useParams();
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesArr = Object.values(bytespaces);

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
   }, [dispatch]);

   return (
      <div>
         {bytespacesArr.length > 0 ? (
            bytespacesArr.map((bytespace) => (
               <NavLink to={`/user/${userId}/bytespaces/${bytespace.id}`}>
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
