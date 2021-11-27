import React, {useState} from "react"
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux" 

import { 
    Grid, 
    Card, 
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
    Fab
} from '@mui/material'

import SearchBar from "./SearchBar"
import { AddSharp, MenuSharp } from "@mui/icons-material"
import { styled } from "@mui/styles"

const Spaces = () => {
    const {user: currentUser} = useSelector((state) => state.auth)
    const [searchText, setSearchText] = useState('')

    const clearSearch = () => {
        setSearchText('')
    }

    if (!currentUser){
        return <Navigate to='/' />
    }

    return (
        <Card
            component={Grid} item container alignItems='center' direction='column'
            xs={12} sm={9} md={7} lg={6}
            sx={{mx: 'auto', pb:4, borderRadius: 0, backgroundColor:'#646881'}}
            elevation={0}
            justifyContent='space-between'
        >

            <Grid item sx={{py:4}}>
                <Typography textAlign='center' fontFamily='comfortaa' fontWeight='bold' variant='h5' color='#ECF8F8'>
                    My Spaces
                </Typography>
            </Grid>

            <Grid item width='85%' sx={{pb:4}}>
                <SearchBar 
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    clearSearch={clearSearch}
                    placeholder='Filter my spaces'
                />
            </Grid>

            <Grid item width='85%'>
                <List sx={{mb: 2}}>
                    <ListSubheader sx={{ bgcolor: '#ECF8F8', pt: .7, pb: .3 }}>
                        <Typography variant='subtitle1' fontFamily='Comfortaa' fontWeight='bold' color='#353745'>
                            Work
                        </Typography>
                    </ListSubheader>
                    <ListItem button>
                        <ListItemText primary="text" secondary="secondary"/>
                    </ListItem>

                    <ListSubheader sx={{ bgcolor: '#ECF8F8', pt: .7, pb: .3 }}>
                        <Typography variant='subtitle1' fontFamily='Comfortaa' fontWeight='bold' color='#353745'>
                            Home
                        </Typography>
                    </ListSubheader>
                    <ListItem button>
                        <ListItemText primary="text" secondary="secondary"/>
                    </ListItem>
                </List>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                    
                    <IconButton>
                        <MenuSharp />
                    </IconButton>
                    <StyledFab>
                        <AddSharp />
                    </StyledFab>
                    <Box sx={{flexGrow: 1}}/>
                    
                </AppBar>
            </Grid>
        </Card>
    )
}

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
})

export default Spaces