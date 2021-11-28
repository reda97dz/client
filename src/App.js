import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Spaces from "./Components/Spaces";
import PageNotFound from "./Components/PageNotFound";
import Shared from "./Components/Shared";

import { logout } from "./slices/auth";

import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import {
  IconButton,
  Divider,
  Typography,
  Tooltip,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
      {currentUser ? (
        <AppBar
          sx={{
            backgroundColor: "#040404",
            width: "100%",
            borderRadius: 0,
          }}
          elevation={0}
        >
          <Toolbar sx={{ minHeight: 64 }}>
            <Typography
              component={NavLink}
              to="/"
              sx={{ textDecoration: "none", cursor: "pointer" }}
              fontFamily="Permanent Marker"
              color="#F7F4F3"
              variant="h5"
            >
              Todo App
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title="Account">
              <IconButton onClick={handleClick} size="large">
                <AccountBoxSharpIcon fontSize="inherit" htmlColor="#F7F4F3" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 1,
                sx: {
                  borderRadius: 0,
                  backgroundColor: "#F7F4F3",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 0,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 15,
                    height: 15,
                    bgcolor: "#F7F4F3",
                    transform:
                      "translateY(-50%) translateX(-30%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                sx={{ color: "#040404" }}
                component={NavLink}
                to="/dashboard"
              >
                {currentUser.last_name} {currentUser.first_name}
              </MenuItem>
              <MenuItem
                sx={{ color: "#040404" }}
                component={NavLink}
                to="/my-spaces"
              >
                My spaces
              </MenuItem>
              <MenuItem
                sx={{ color: "#040404" }}
                component={NavLink}
                to="/shared-with-me"
              >
                Shared with me
              </MenuItem>
              <Divider />
              <MenuItem sx={{ color: "#93032E" }} onClick={logOut}>
                <ListItemIcon>
                  <LogoutSharpIcon htmlColor="#93032E" fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      ) : null}

      <div>
        <Routes>
          <Route exact path="/dashboard" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/my-spaces" element={<PrivateRoute />}>
            <Route exact path="/my-spaces" element={<Spaces />} />
          </Route>
          <Route exact path="/shared-with-me" element={<PrivateRoute />}>
            <Route exact path="/shared-with-me" element={<Shared />} />
          </Route>
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
