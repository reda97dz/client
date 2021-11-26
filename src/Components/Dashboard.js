import React from "react"
import {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux" 

import NotesSharpIcon from '@mui/icons-material/NotesSharp'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { 
    Grid, 
    Paper, 
    Card, 
    Typography, 
    Container, 
    Button, 
    Chip,
    Divider,
    InputBase ,
    IconButton, 
    Stack
} from '@mui/material'

const Dashboard = () => {
    const {user: currentUser} = useSelector((state) => state.auth)

    if (!currentUser){
        return <Navigate to='/' />
    }

    return (

        // <Container component={Grid} container sx={{p:0}}>
        //     <Card
        //         component={Grid} item container alignItems='center'
        //         xs={12} sm={9} md={7} lg={6}
        //         sx={{mx: 'auto', borderRadius: 0, backgroundColor: '#040404', borderColor: '#040404'}}
        //         variant='outlined'
        //         justifyContent='space-between'
        //     >
                
        //     </Card>
        // </Container>

        <div>
            {/* <h1>{currentUser.first_name} {currentUser.last_name}</h1>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p> */}
            <Container component={Grid} container sx={{p:0}}>
                 <Card
                    component={Grid} item container alignItems='center' direction='column'
                    xs={12} sm={9} md={7} lg={6}
                    sx={{mx: 'auto', pb:2, borderRadius: 0, backgroundColor:'#646881'}}
                    elevation={0}
                    justifyContent='space-between'
                >
                    <Grid item sx={{py:4}}>
                        <Typography textAlign='center' fontFamily='comfortaa' fontWeight='bold' variant='h5' color='#ECF8F8'>
                            Friday
                        </Typography>
                        <Typography variant='body2' fontFamily='Cairo' fontWeight='bold' color='#353745'>
                            Nov 24, 2021
                        </Typography>
                    </Grid>
                    <Grid item width='78%'>
                        <Paper component='form' variant='outlined'
                            sx={{ 
                                borderRadius: 0, 
                                mt: 0.3, 
                                borderColor: '#2C2E3A',
                                backgroundColor: '#353745', 
                                display: 'flex', 
                                alignItems: 'center',
                                mx: 'auto',
                                width: '100%'
                            }}
                        >
                            <NotesSharpIcon fontSize='small' htmlColor='#979AAF' sx={{mx:1}} />
                            <InputBase
                                sx={{ml: 1, flex: 1, color: '#979AAF'}}
                                placeholder= "Add a task..."
                                onSubmit={()=>console.log("post")}
                            />
                            <Chip 
                                label="Work" 
                                onDelete={()=>{console.log('delete')}} 
                                size="small" variant='outlined' color='primary' />
                            <IconButton>
                                <MoreVertSharpIcon fontSize='small' htmlColor='#979AAF' />
                            </IconButton>
                        </Paper>
                    </Grid>
                 </Card>
            </Container>
        </div>
    )
}

export default Dashboard