import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { BsPersonSquare } from "react-icons/bs";

function UpdateMessage({ messageObj, socket, setRenderEdit }) {
   const [messageToEdit, setMessageToEdit] = useState(messageObj.message);

   const editMessage = (e) => {
      e.preventDefault();

      const updatedMessageObj = {
         id: messageObj.id,
         message: messageToEdit,
      };

      socket.emit("ws_update_message", updatedMessageObj);
      setRenderEdit(false);
   };

   return (
      <Row className="chatroom-display-message-div">
         <Col xxl={1} className="message-div-person">
            <BsPersonSquare />
         </Col>
         <Col xxl={10}>
            <InputGroup className="input-for-edit-message">
               <FormControl
                  as="textarea"
                  value={messageToEdit}
                  onChange={(e) => setMessageToEdit(e.target.value)}
                  rows={3}
                  style={{ resize: "vertical" }}
               />
            </InputGroup>
         </Col>
         <Col className="edit-buttons-div">
            <Button
               className="edit-buttons-for-update edit-button-update"
               onClick={editMessage}
               variant="success"
            >
               Save
            </Button>
            <Button
               className="edit-buttons-for-update"
               onClick={() => setRenderEdit(false)}
               variant="outline-secondary"
            >
               Cancel
            </Button>
         </Col>
      </Row>
   );
}

export default UpdateMessage;
