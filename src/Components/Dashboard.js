import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { Helmet } from "react-helmet";
import userService from "../services/user.service";

import Todo from "./Todo";
import EditDialog from "./EditTodoDialog";

import NotesSharpIcon from "@mui/icons-material/NotesSharp";

import {
  Grid,
  Paper,
  Typography,
  Chip,
  InputBase,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { KeyboardDoubleArrowDownSharp } from "@mui/icons-material";

const Dashboard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editTodo, setEditTodo] = useState({});
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [spaces, setSpaces] = useState([]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const openDropMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    getSpaces();
  }, []);

  async function getTodos() {
    try {
      const res = await userService.getTodos();
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSpaces() {
    const res = await userService.getSpaces();
    setSpaces(res.data);
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const space = selectedSpace ? selectedSpace.id : null;
      console.log({ text: todoText, space_id: space });
      const res = await userService.addTodo({
        text: todoText,
        space_id: space,
      });
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
    const getTodos = await userService.getTodos();
    setTodos(getTodos.data);
    // setTodos(todos.map((todo) => (todo.id !== id ? todo : editedTodo.data)));
  };

  const handleToggleTodo = async (todo) => {
    const editedTodo = await userService.editTodo(todo.id, {
      done: !todo.done,
    });
    const getTodos = await userService.getTodos();
    setTodos(getTodos.data);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
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
          {selectedSpace && (
            <Chip
              label={`${selectedSpace.name}`}
              onDelete={() => {
                setSelectedSpace(null);
              }}
              size="small"
              variant="outlined"
              color="primary"
            />
          )}
          <Tooltip title="show spaces">
            <IconButton onClick={openDropMenu}>
              <KeyboardDoubleArrowDownSharp
                fontSize="small"
                htmlColor="#979AAF"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              square: true,
              elevation: 0,
              sx: {
                borderRadius: 0,
                backgroundColor: "#353745",
                borderColor: "#2C2E3A",
                overflow: "visible",
                mt: 0.1,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              sx={{ color: "#979AAF" }}
              onClick={() => {
                setSelectedSpace(null);
              }}
            >
              No space
            </MenuItem>
            {spaces.map((space) => {
              return (
                <MenuItem
                  key={space.id}
                  sx={{ color: "#979AAF" }}
                  onClick={() => {
                    setSelectedSpace(space);
                  }}
                >
                  {space.name}
                </MenuItem>
              );
            })}
          </Menu>
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
              <React.Fragment key={todo.id}>
                <Todo
                  showSpace={true}
                  todo={todo}
                  handleToggleTodo={handleToggleTodo}
                  handleDelete={handleDelete}
                  handleDialogOpen={handleDialogOpen}
                />
                <Divider width="95%" sx={{ mt: 2 }} />
              </React.Fragment>
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
