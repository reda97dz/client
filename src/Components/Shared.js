import React from "react"
import {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux" 

// import NotesSharpIcon from '@mui/icons-material/NotesSharp'
// import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
// import MoreHorizSharp from '@mui/icons-material/MoreHorizSharp'
import { 
    Grid, 
    // Paper, 
    Card, 
    Typography, 
    Container, 
    // Button, 
    // Chip,
    // Checkbox,
    // InputBase ,
    // IconButton, 
    // Stack
} from '@mui/material'

const Shared = () => {
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
                    sx={{mx: 'auto', pb:4, borderRadius: 0, backgroundColor:'#646881'}}
                    elevation={0}
                    justifyContent='space-between'
                >

                    <Grid item sx={{py:4}}>
                        <Typography textAlign='center' fontFamily='comfortaa' fontWeight='bold' variant='h5' color='#ECF8F8'>
                            Spaces shared with me
                        </Typography>
                    </Grid>


                 </Card>
            </Container>
        </div>
    )
}

export default Shared