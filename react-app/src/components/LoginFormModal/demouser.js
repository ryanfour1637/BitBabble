import React from "react";

function DemoUser({ setEmail, setPassword }) {
   const onClick = () => {
      setEmail("demo@aa.io");
      setPassword("password");
   };

   return (
      <button
         className="login-modal-submit-buttons top-button-login"
         onClick={onClick}
      >
         Log in as DemoUser
      </button>
   );
}

export default DemoUser;
