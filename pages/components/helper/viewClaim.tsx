import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Define the style for the modal's box as before.
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Interface for the modal content
interface ModalContent {
  amount: string;
}

// Interface for the component props
interface ModalButtonProps {
  buttonText: string;
  modalContent: ModalContent;
}

// The ModalButton component with TypeScript
const ModalButton: React.FC<ModalButtonProps> = ({
  buttonText,
  modalContent,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const totalAmountNumber = parseFloat(modalContent.amount);
  const formattedAmount = new Intl.NumberFormat("en-US").format(
    totalAmountNumber
  );

  return (
    <>
      <Button onClick={handleOpen}>{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <p>
              Amount: {formattedAmount} <span>&#8369;</span>
            </p>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalButton;
