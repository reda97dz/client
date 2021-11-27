import { MoreHoriz } from "@mui/icons-material";
import { Box, ListItem, ListSubheader, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Todo from "./Todo";
import EditDialog from "./EditDialog";
import userService from "../services/user.service";

const Space = ({ space, ...rest }) => {
  const [editTodo, setEditTodo] = useState({});
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [todos, setTodos] = useState(space.Todos);

  const handleEditDialogOpen = (todo) => {
    setEditTodo(todo);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
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

  const handleEdit = async (id, newTodo) => {
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
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="subtitle1"
            fontFamily="Comfortaa"
            fontWeight="bold"
            color="#353745"
          >
            {space.name}
          </Typography>
          <MoreHoriz />
        </Stack>
      </ListSubheader>
      {space.Todos.length === 0 ? (
        <ListItem>Such empty</ListItem>
      ) : (
        todos.map((todo) => {
          return (
            <ListItem key={todo.id}>
              <Todo
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
        handleEdit={handleEdit}
        handleClose={handleEditDialogClose}
        todo={editTodo}
      />
    </Box>
  );
};

export default Space;
