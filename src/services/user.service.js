import axios from "axios";
import authHeader from "./auth-header";

const getTodos = () => {
  return axios.get("api/todos", {
    headers: authHeader(),
  });
};

const addTodo = (todoObject) => {
  const newTodo = axios.post("api/todos", todoObject, {
    headers: authHeader(),
  });
  return newTodo;
};

const removeTodo = (id) => {
  axios.delete(`api/todos/${id}`, {
    headers: authHeader(),
  });
};

const editTodo = (id, newTodo) => {
  const editedTodo = axios.put(
    `api/todos/${id}`,
    { ...newTodo },
    { headers: authHeader() }
  );
  return editedTodo;
};

const getSpaces = () => {
  return axios.get("api/spaces", {
    headers: authHeader(),
  });
};

const addSpace = (spaceObject) => {
  const newSpace = axios.post("api/spaces", spaceObject, {
    headers: authHeader(),
  });
  return newSpace;
};

const editSpace = (id, newSpace) => {
  const editedSpace = axios.put(
    `api/spaces/${id}`,
    { ...newSpace },
    { headers: authHeader() }
  );
  return editedSpace;
};

const removeSpace = (id) => {
  axios.delete(`api/spaces/${id}`, {
    headers: authHeader(),
  });
};

const getSharedSpaces = () => {
  return axios.get("api/sharedSpaces", {
    headers: authHeader(),
  });
};

const userService = {
  getTodos,
  addTodo,
  removeTodo,
  editTodo,
  getSpaces,
  addSpace,
  editSpace,
  removeSpace,
  getSharedSpaces,
};

export default userService;
