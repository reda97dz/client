import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Spaces from './Components/Spaces'

import {logout} from './slices/auth'
import { Navigate } from 'react-router-dom'

import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'

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
import Shared from './Components/Shared'


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
        {currentUser ? (
          
          <Container component={Grid} container sx={{p:0,}}>
            <Card
                component={Grid} item container direction='row' alignItems='center'
                xs={12} sm={9} md={7} lg={6}
                sx={{m: 'auto', p:0.3, pl:1, borderRadius: 0, backgroundColor: '#040404', borderColor: '#040404'}}
                variant='outlined'
                justifyContent='space-between'
            >
              <Grid item >
                <Typography component={NavLink} to='/' sx={{ textDecoration:'none', cursor: 'pointer'}} fontFamily='Permanent Marker' color='#F7F4F3'>
                  Todo App
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title='Account'>
                  <IconButton onClick={handleClick} size='small'>
                    <AccountBoxSharpIcon size='small' htmlColor='#F7F4F3' />
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
                      backgroundColor: '#040404',
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
                        bgcolor: '#040404',
                        transform: 'translateY(-50%) translateX(30%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem 
                    sx={{color: '#F5F5F5'}}
                    component={NavLink}
                    to='/dashboard' 
                  >
                    {currentUser.last_name} {currentUser.first_name}
                  </MenuItem>
                  <MenuItem 
                    sx={{color: '#F5F5F5'}}  
                    component={NavLink}
                    to='/my-spaces'
                  >
                    My spaces
                  </MenuItem>
                  <MenuItem 
                    sx={{color: '#F5F5F5'}}
                    component={NavLink}
                    to='/shared-with-me' 
                  >
                    Shared with me
                  </MenuItem>
                  <Divider />
                  <MenuItem sx={{color: '#90323D'}} onClick={logOut}>
                    <ListItemIcon >
                      <LogoutSharpIcon htmlColor='#90323D' fontSize="small" />
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
            <Route exact path="/my-spaces" element={<Spaces/>} />
            <Route exact path="/shared-with-me" element={<Shared/>} />
            <Route exact path="/" element={<Login />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App