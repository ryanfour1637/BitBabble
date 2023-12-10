import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import DemoUser from "./demouser";
import "./LoginForm.css";

function LoginFormModal() {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState([]);
   const { closeModal } = useModal();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
         setErrors(data);
      } else {
         closeModal();
         push("/");
      }
   };

   return (
      <div className="login-modal-outerdiv">
         <h1 className="login-modal-loginwords">Log In</h1>
         <form className="login-modal-form" onSubmit={handleSubmit}>
            <ul>
               {errors.map((error, idx) => (
                  <li className="login-modal-errors" key={idx}>
                     {error}
                  </li>
               ))}
            </ul>
            <div className="login-modal-inputdiv">
               <label className="login-modal-label">
                  Email
                  <input
                     className="login-modal-form-inputs"
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     placeholder="Enter your email"
                  />
               </label>

               <label className="login-modal-label">
                  Password
                  <input
                     className="login-modal-form-inputs"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     placeholder="Enter your password"
                  />
               </label>

               <DemoUser setEmail={setEmail} setPassword={setPassword} />
               <button className="login-modal-submit-buttons" type="submit">
                  Log In
               </button>
            </div>
         </form>
      </div>
   );
}

export default LoginFormModal;
