import React from "react";

function DemoUser({ setEmail, setPassword }) {
   const onClick = () => {
      setEmail("demo@aa.io");
      setPassword("password");
   };

   return <button onClick={onClick}>Log in as DemoUser</button>;
}

export default DemoUser;
