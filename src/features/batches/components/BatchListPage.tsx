import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { BatchList } from "./BatchList";
import { CreateBatch } from "./CreateBatch";

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
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Button
          variant="contained"
          sx={{ width: "13rem" }}
          onClick={handleOpen}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Batch
          </Typography>
        </Button>
      </Stack>
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
