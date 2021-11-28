import React, { useState } from "react";
import {
  Typography,
  Divider,
  InputBase,
  Dialog,
  Stack,
  Button,
} from "@mui/material";

const EditSpace = ({ open, handleEdit, handleDelete, handleClose, space }) => {
  const [newName, setNewName] = useState("");

  const editSpace = (e) => {
    e.preventDefault();
    handleEdit(space.id, { name: newName });
    setNewName("");
    handleClose();
  };

  const deleteSpace = () => {
    handleDelete(space.id);
    setNewName("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setNewName("");
        handleClose();
      }}
    >
      <Stack component="form" onSubmit={editSpace} sx={{ mx: 1, mb: 2 }}>
        <Typography fontFamily="Cairo" variant="h6">
          Editing space {space.name}
        </Typography>
        <Divider />
        <Typography fontFamily="Cairo" fontWeight="bold" sx={{ mt: 1 }}>
          New Name
        </Typography>
        <InputBase
          value={newName}
          autoFocus
          placeholder="enter new name for your space"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          type="text"
          sx={{
            fontFamily: "Cairo",
            backgroundColor: "#cccccc",
            px: 0.8,
          }}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={deleteSpace}
          component="span"
          sx={{ borderRadius: 0, mt: 2 }}
        >
          Remove Space
        </Button>
      </Stack>
    </Dialog>
  );
};

export default EditSpace;
