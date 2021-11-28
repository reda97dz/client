import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import NotesSharpIcon from '@mui/icons-material/NotesSharp'
// import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
// import MoreHorizSharp from '@mui/icons-material/MoreHorizSharp'
import {
  Grid,
  // Paper,
  //   Card,
  Typography,
  //   Container,
  // Button,
  // Chip,
  // Checkbox,
  // InputBase ,
  // IconButton,
  // Stack
} from "@mui/material";
import { Helmet } from "react-helmet";

const Shared = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Grid item sx={{ py: 4 }}>
      <Helmet>
        <title>Spaces Shared With Me</title>
      </Helmet>
      <Typography
        textAlign="center"
        fontFamily="comfortaa"
        fontWeight="bold"
        variant="h5"
        color="#ECF8F8"
      >
        Spaces shared with me
      </Typography>
    </Grid>
  );
};

export default Shared;
