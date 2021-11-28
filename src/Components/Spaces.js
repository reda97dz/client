import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import AddSpaceDialog from "./AddSpaceDialog";
import Space from "./Space";

import {
  Grid,
  Card,
  Paper,
  Typography,
  Container,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Fab,
  Stack,
} from "@mui/material";

import SearchBar from "./SearchBar";
import {
  AddSharp,
  AssignmentTurnedInSharp,
  MenuSharp,
  EditSharpIcon,
  MoreHoriz,
  MoreHorizSharp,
  MoreVertSharp,
  EditSharp,
  RestartAltSharp,
} from "@mui/icons-material";
import { styled } from "@mui/styles";
import userService from "../services/user.service";
import EditSpace from "./EditSpaceDialog";

const Spaces = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSpace, setEditSpace] = useState({});

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditDialogOpen = (space) => {
    setEditSpace(space);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  useEffect(() => {
    getSpaces();
  }, []);

  const clearSearch = () => {
    setSearchText("");
  };

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  async function getSpaces() {
    try {
      const res = await userService.getSpaces();
      console.log(res.data);
      setSpaces(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddSpace = async (spaceObject) => {
    try {
      const res = await userService.addSpace(spaceObject);
      console.log(`${res.data.name} added`);
      const getSpaces = await userService.getSpaces();
      setSpaces(getSpaces.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, newSpace) => {
    try {
      const editedSpace = await userService.editSpace(id, newSpace);
      const getSpaces = await userService.getSpaces();
      setSpaces(getSpaces.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      userService.removeSpace(id);
      setSpaces(spaces.filter((space) => space.id !== id));
    } catch (error) {
      console.log(error);
    }
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
          My Spaces
        </Typography>
      </Grid>

      <Grid item width="85%" sx={{ pb: 4 }}>
        <SearchBar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          clearSearch={clearSearch}
          placeholder="Filter my spaces"
        />
      </Grid>

      <Grid item width="85%">
        <Paper
          square
          elevation={0}
          sx={{ pb: "50px", backgroundColor: "transparent" }}
        >
          <List sx={{ mb: 2 }}>
            {spaces.map((space) => {
              return (
                <Space
                  key={space.id}
                  space={space}
                  handleEditSpaceDialogOpen={handleEditDialogOpen}
                  sx={{ pb: 2 }}
                />
              );
            })}
          </List>
        </Paper>
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            backgroundColor: "#040404",
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <StyledFab
              variant="extended"
              size="medium"
              sx={{ backgroundColor: "#353745" }}
              onClick={handleAddDialogOpen}
            >
              <AddSharp htmlColor="#ECF8F8" sx={{ mr: 0.5 }} />
              <Typography color="#ECF8F8" fontFamily="Cairo" fontWeight="bold">
                Add Space
              </Typography>
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
        <AddSpaceDialog
          handleClose={handleAddDialogClose}
          open={openAddDialog}
          handleSubmit={handleAddSpace}
        />
        <EditSpace
          open={openEditDialog}
          handleEdit={handleEdit}
          handleClose={handleEditDialogClose}
          space={editSpace}
          handleDelete={handleDelete}
        />
      </Grid>
    </>
  );
};

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "auto",
});

export default Spaces;
