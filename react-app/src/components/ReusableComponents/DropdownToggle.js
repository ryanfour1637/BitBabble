import { useState } from "react";

function useDropdownToggle() {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   return [isOpen, toggle];
}

export default useDropdownToggle;
