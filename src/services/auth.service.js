import axios from "axios";

const login = async (email, password) => {
  const response = await axios.post("api/login/", { email, password });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
