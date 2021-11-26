import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

import {logout} from './slices/auth'

import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon';

import { 
  Grid,
  IconButton, 
  Paper, 
  Divider,
  Card, 
  Typography, 
  Container, 
  Button, 
  InputBase ,
  Stack, 
  Tooltip
} from '@mui/material'


function App(){

  const {user: currentUser} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

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
      <div>
        {currentUser ? (
          
          <Container component={Grid} container sx={{p:0, m:0}}>
            <Card
                component={Grid} item container direction='row' alignItems='center'
                xs={12} sm={9} md={7} lg={6}
                sx={{mx: 'auto', p:0.3, pl:1, borderRadius: 0, backgroundColor: '#000', borderColor: '#000'}}
                variant='outlined'
                justifyContent='space-between'
            >
              <Grid item>
                <Typography color='#fff' fontWeight='bold'>
                  Todo App
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Account'>
                  <IconButton onClick={handleClick} size='small'>
                    <AccountBoxSharpIcon size='small' htmlColor='#fff' />
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
                      backgroundColor: '#222',
                      overflow: 'visible',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: '#222',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem sx={{color: 'white'}}>
                    <Avatar /> {currentUser.last_name} {currentUser.last_name}
                  </MenuItem>
                  {/* <Divider light /> */}
                  <MenuItem sx={{color: 'white'}} onClick={logOut}>
                    <ListItemIcon >
                      <Logout htmlColor='#fff' fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Grid>
            </Card>
          </Container>
        ): null}

        {/* <nav>
          {currentUser ? (
            <div>
              <li>
                {currentUser.email}
              </li>
              <li>
                <a href='/' onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            null
          )}
        </nav> */}

        <div>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/" element={<Login />} />
          </Routes>
        </div>

      </div>
    </Router>
  )
}

export default App