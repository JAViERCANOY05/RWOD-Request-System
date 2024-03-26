import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";

interface Document {
  name: string;
  number: string;
}

const ParentModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChildOpen = () => {
    setChildOpen(true);
  };

  const handleChildClose = () => {
    setChildOpen(false);
  };

  const handleAddDocument = () => {
    // Add the document to the list
    const newDocument: Document = { name, number };
    setDocuments([...documents, newDocument]);
    // Close the child modal
    setChildOpen(false);
    // Clear input fields
    setName("");
    setNumber("");
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <h2 id="parent-modal-title">Parent Modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          {documents.map((document, index) => (
            <div key={index}>
              {document.name}: {document.number}
            </div>
          ))}
          <Button onClick={handleChildOpen}>Add Document</Button>
          <Modal
            open={childOpen}
            onClose={handleChildClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ width: 400 }}>
              <h2 id="child-modal-title">Add Document</h2>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Number"
                variant="outlined"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <Button onClick={handleAddDocument}>Add</Button>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  );
};

export default ParentModal;
