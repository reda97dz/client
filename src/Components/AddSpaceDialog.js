import React, { useState } from "react";
import { Typography, Divider, InputBase, Dialog, Stack } from "@mui/material";

const AddSpaceDialog = ({ open, handleSubmit, handleClose }) => {
  const [name, setName] = useState("");

  const addSpace = (e) => {
    e.preventDefault();
    console.log(name);
    handleSubmit({ name: name });
    setName("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setName("");
        handleClose();
      }}
    >
      <Stack component="form" onSubmit={addSpace} sx={{ mx: 1, mb: 2 }}>
        <Typography fontFamily="Cairo" variant="h6">
          Create a new space
        </Typography>
        <Divider />
        <Typography fontFamily="Cairo" fontWeight="bold" sx={{ mt: 1 }}>
          Name your space
        </Typography>
        <InputBase
          value={name}
          autoFocus
          placeholder="type the name of your space"
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          sx={{
            fontFamily: "Cairo",
            backgroundColor: "#cccccc",
            px: 0.8,
          }}
        />
      </Stack>
    </Dialog>
  );
};

export default AddSpaceDialog;
