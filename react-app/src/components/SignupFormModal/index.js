import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
   const dispatch = useDispatch();
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const { closeModal } = useModal();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         const data = await dispatch(
            signUp(firstName, lastName, username, email, password)
         );
         if (data) {
            setErrors(data);
         } else {
            closeModal();
         }
      } else {
         setErrors([
            "Confirm Password field must be the same as the Password field",
         ]);
      }
   };

   return (
      <div className="signup-modal-outerdiv">
         <div className="signup-modal-topdiv">
            <h1 className="signup-modal-signupwords">Sign Up</h1>
            <h5 className="signup-modal-startingwords">
               Get started by entering your details.
            </h5>
         </div>
         <form className="signup-modal-form" onSubmit={handleSubmit}>
            <ul>
               {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
               ))}
            </ul>
            <div className="signup-modal-inputdiv">
               <label className="signup-modal-form-labels">
                  <input
                     className="signup-modal-form-inputs"
                     type="text"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     required
                     placeholder="First name"
                  />
               </label>
            </div>
            <div className="signup-modal-inputdiv">
               <label className="signup-modal-form-labels">
                  <input
                     className="signup-modal-form-inputs"
                     type="text"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     required
                     placeholder="Last name"
                  />
               </label>
            </div>
            <div className="signup-modal-inputdiv">
               <label className="signup-modal-form-labels">
                  <input
                     className="signup-modal-form-inputs"
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     placeholder="Enter your email address"
                  />
               </label>
            </div>
            <div className="signup-modal-inputdiv">
               <label className="signup-modal-form-labels">
                  <input
                     className="signup-modal-form-inputs"
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                     placeholder="Create your username"
                  />
               </label>
            </div>
            <div className="signup-modal-inputdiv">
               <label className="signup-modal-form-labels">
                  <input
                     className="signup-modal-form-inputs"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     placeholder="Enter your password"
                  />
               </label>
            </div>
            <div className="signup-modal-inputdiv">
               <label className="signup-modal-form-labels">
                  <input
                     className="signup-modal-form-inputs"
                     type="password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     required
                     placeholder="Confirm your password"
                  />
               </label>
            </div>
            <button className="signup-modal-form-submitbutton" type="submit">
               Sign Up
            </button>
         </form>
      </div>
   );
}

export default SignupFormModal;
