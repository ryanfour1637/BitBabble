import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";

const RightClickMenuContext = React.createContext();

export function RightClickMenuProvider({ children }) {
   const menuRef = useRef();
   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
   const [menuContent, setMenuContent] = useState(null);

   const openRightClickMenu = (content, position) => {
      setMenuContent(content);
      setMenuPosition(position);
   };

   const closeRightClickMenu = () => {
      setMenuContent(null);
   };

   const contextValue = {
      menuRef,
      menuContent,
      menuPosition,
      openRightClickMenu,
      closeRightClickMenu,
   };

   return (
      <>
         <RightClickMenuContext.Provider value={contextValue}>
            {children}
         </RightClickMenuContext.Provider>
         <div ref={menuRef} />
      </>
   );
}

export function RightClickMenu() {
   const { menuRef, menuContent, menuPosition, closeRightClickMenu } =
      useContext(RightClickMenuContext);
   if (!menuRef || !menuRef.current || !menuContent) return null;

   return ReactDOM.createPortal(
      <div
         id="right-click-menu"
         style={{ top: menuPosition.y, left: menuPosition.x }}
      >
         <div id="right-click-menu-content">{menuContent}</div>
      </div>,
      menuRef.current
   );
}

export const useRightClickMenu = () => useContext(RightClickMenuContext);
