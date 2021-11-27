import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import userService from "../services/user.service";

import Todo from "./Todo";
import EditDialog from "./EditDialog";

import NotesSharpIcon from "@mui/icons-material/NotesSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

import {
  Grid,
  Paper,
  Card,
  Typography,
  Box,
  Chip,
  InputBase,
  IconButton,
} from "@mui/material";

const Dashboard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editTodo, setEditTodo] = useState({});

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = (todo) => {
    console.log(todo);
    setEditTodo(todo);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      const res = await userService.getTodos();
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userService.addTodo({ text: todoText });
      setTodos(todos.concat(res.data));
      setTodoText("");
    } catch (error) {
      console.log(error);
    }
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
    <>
      <Grid item sx={{ py: 4 }}>
        <Typography
          textAlign="center"
          fontFamily="comfortaa"
          fontWeight="bold"
          variant="h5"
          color="#ECF8F8"
        >
          {moment().format("dddd")}
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          fontFamily="Cairo"
          fontWeight="bold"
          color="#353745"
        >
          {moment().format("MMM DD, YYYY")}
        </Typography>
      </Grid>
      <Grid item width="85%" sx={{ pb: 4 }}>
        <Paper
          component="form"
          variant="outlined"
          sx={{
            borderRadius: 0,
            mt: 0.3,
            borderColor: "#2C2E3A",
            backgroundColor: "#353745",
            display: "flex",
            alignItems: "center",
            mx: "auto",
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <NotesSharpIcon fontSize="small" htmlColor="#979AAF" sx={{ mx: 1 }} />
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#979AAF" }}
            placeholder="Add a task..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <Chip
            label="Work"
            onDelete={() => {
              console.log("delete");
            }}
            size="small"
            variant="outlined"
            color="primary"
          />
          <IconButton>
            <MoreVertSharpIcon fontSize="small" htmlColor="#979AAF" />
          </IconButton>
        </Paper>
      </Grid>
      <Paper
        component={Grid}
        width="90%"
        item
        container
        direction="column"
        elevation={0}
        sx={{
          p: 0.5,
          borderRadius: 0,
          backgroundColor: "transparent",
          // borderColor: '#2C2E3A',
          alignItems: "center",
        }}
        spacing={2}
      >
        {todos.length === 0 ? (
          <p>Nothing to see here</p>
        ) : (
          todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                handleToggleTodo={handleToggleTodo}
                handleDelete={handleDelete}
                handleDialogOpen={handleDialogOpen}
              />
            );
          })
        )}
        <EditDialog
          open={openDialog}
          handleEdit={handleEdit}
          handleClose={handleDialogClose}
          todo={editTodo}
        />
      </Paper>
    </>
  );
};

export default Dashboard;
