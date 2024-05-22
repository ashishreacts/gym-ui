import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { CreateBatch } from "./CreateBatch";
import { BatchList } from "./BatchList";

export const BatchListPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  return (
    <Stack>
      <Button variant="contained" onClick={handleOpen}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Batch
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateBatch onSuccess={() => console.log("")} />
        </Box>
      </Modal>
      <BatchList />
    </Stack>
  );
};
