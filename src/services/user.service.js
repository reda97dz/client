import axios from "axios"
import authHeader from "./auth-header"

const getTodos = async () => {
    return await axios.get('/api/todos', {headers: authHeader()})
}

const getSpaces = async () => {
    return await axios.get('/api/spaces', {headers: authHeader()})
}

const getSharedSpaces = async () => {
    return await axios.get('/api/sharedSpaces', {headeres: authHeader()})
}

const userService = {
    getTodos,
    getSpaces,
    getSharedSpaces
}

export default userService