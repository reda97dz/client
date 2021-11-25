import axios from "axios"

const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/login/', { email, password })
    console.log(response.data)
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem("user")
}

const AuthService = {
    login, logout
}

export default AuthService