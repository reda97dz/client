import React, { useState } from "react";
import moment from "moment";
import MoreHorizSharp from "@mui/icons-material/MoreHorizSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import RuleSharpIcon from "@mui/icons-material/RuleSharp";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import AssignmentLateSharpIcon from "@mui/icons-material/AssignmentLateSharp";
import AssignmentTurnedInSharpIcon from "@mui/icons-material/AssignmentTurnedInSharp";

import {
  Grid,
  Typography,
  Divider,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";

const Todo = ({
  todo,
  handleDialogOpen,
  handleToggleTodo,
  handleDelete,
  showSpace,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTodo = () => {
    handleDelete(todo.id);
  };

  const editTodo = () => {
    handleDialogOpen(todo);
  };

  const toggleTodo = () => {
    handleToggleTodo(todo);
  };

  return (
    <Grid key={todo.id} item container direction="row">
      <Grid item xs={2} md={1} textAlign="left" sx={{ mt: 0.4 }}>
        <IconButton onClick={toggleTodo} size="medium">
          {/* <MoreHorizSharp fontSize='small' htmlColor='#979AAF' /> */}
          {todo.done ? (
            <AssignmentTurnedInSharpIcon
              fontSize="inherit"
              htmlColor="#50B9AB"
            />
          ) : (
            <AssignmentLateSharpIcon fontSize="inherit" htmlColor="#F69A79" />
          )}
        </IconButton>
      </Grid>
      <Grid item xs container direction="column">
        <Grid item>
          <Typography
            fontFamily="Cairo"
            variant="h6"
            fontWeight="bold"
            color={todo.done ? `#50B9AB` : `#F69A79`}
          >
            {todo.text}
          </Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              fontFamily="Cairo"
              fontWeight="bold"
              variant="subtitle2"
              color="#353745"
            >
              {moment(todo.created_at).format("dddd, MMM DD, Y")}
            </Typography>
            {showSpace && todo.Space && (
              <Chip
                label={`${todo.Space.name}`}
                size="small"
                variant="outlined"
                sx={{ color: "#353745", backgroundColor: "#ECF8F8" }}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={2} md={1} item textAlign="right">
        <IconButton onClick={handleClick} size="medium">
          <MoreHorizSharp
            fontSize="inherit"
            htmlColor={todo.done ? `#50B9AB` : `#F69A79`}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 1,
            sx: {
              borderRadius: 0,
              backgroundColor: "#353745",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#353745",
                transform: "translateY(-50%) translateX(-10%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem sx={{ color: "#979AAF", py: 0 }} onClick={toggleTodo}>
            <ListItemIcon>
              <RuleSharpIcon htmlColor="#979AAF" fontSize="small" />
            </ListItemIcon>
            Mark as {todo.done ? `Undone` : `Done`}
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: "#979AAF", py: 0 }} onClick={editTodo}>
            <ListItemIcon>
              <EditSharpIcon htmlColor="#979AAF" fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: "#AD2831", py: 0 }} onClick={deleteTodo}>
            <ListItemIcon>
              <DeleteForeverSharpIcon htmlColor="#AD2831" fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Todo;
