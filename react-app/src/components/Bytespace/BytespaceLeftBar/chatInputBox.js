import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";
import { Row } from "react-bootstrap";

function ChatInputBox({
   message,
   setMessage,
   sendMessage,
   bytestreamName,
   sendWithEnter,
}) {
   return (
      <>
         <Row className="input-rows-messages">
            <InputGroup className="input-for-messages">
               <FormControl
                  as="textarea"
                  placeholder={`Message #${bytestreamName}`}
                  aria-label={`Message #${bytestreamName}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={sendWithEnter}
                  rows={4}
                  style={{ resize: "none" }}
               />
               <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={sendMessage}
                  disabled={message == ""}
               >
                  <IoMdSend />
               </Button>
            </InputGroup>
         </Row>
      </>
   );
}

export default ChatInputBox;
