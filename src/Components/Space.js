import { EditSharp } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItem,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Todo from "./Todo";
import EditDialog from "./EditTodoDialog";
import userService from "../services/user.service";

const Space = ({ space, handleEditSpaceDialogOpen, ...rest }) => {
  const [editTodo, setEditTodo] = useState({});
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [todos, setTodos] = useState(space.Todos);

  const editSpace = () => {
    handleEditSpaceDialogOpen(space);
  };

  const handleEditDialogOpen = (todo) => {
    setEditTodo(todo);
    setOpenEditDialog(true);
  };

  const handleTodoEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDelete = (id) => {
    try {
      userService.removeTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoEdit = async (id, newTodo) => {
    const editedTodo = await userService.editTodo(id, newTodo);
    setTodos(todos.map((todo) => (todo.id !== id ? todo : editedTodo.data)));
  };

  const handleToggleTodo = async (todo) => {
    const editedTodo = await userService.editTodo(todo.id, {
      done: !todo.done,
    });
    setTodos(todos.map((t) => (t.id !== todo.id ? t : editedTodo.data)));
  };

  return (
    <Box {...rest}>
      <ListSubheader sx={{ bgcolor: "#ECF8F8", pt: 0.7, pb: 0.3 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            pb: 0.3,
          }}
        >
          <Typography
            variant="subtitle1"
            fontFamily="Comfortaa"
            fontWeight="bold"
            color="#353745"
            sx={{ cursor: "pointer" }}
          >
            {space.name}
          </Typography>
          <Tooltip title="Edit Space">
            <IconButton onClick={editSpace} size="small">
              <EditSharp fontSize="inherit" htmlColor="#353745" />
            </IconButton>
          </Tooltip>
        </Stack>
      </ListSubheader>
      {space.Todos.length === 0 ? (
        <ListItem>Such empty</ListItem>
      ) : (
        todos.map((todo) => {
          return (
            <ListItem key={todo.id}>
              <Todo
                showSpace={false}
                todo={todo}
                handleToggleTodo={handleToggleTodo}
                handleDelete={handleDelete}
                handleDialogOpen={handleEditDialogOpen}
              />
            </ListItem>
          );
        })
      )}

      <EditDialog
        open={openEditDialog}
        handleEdit={handleTodoEdit}
        handleClose={handleTodoEditDialogClose}
        todo={editTodo}
      />
    </Box>
  );
};

export default Space;
