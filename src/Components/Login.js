import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

import {login} from "../slices/auth"
import {clearMessage} from '../slices/message'

import { 
    Grid, 
    Paper, 
    Card, 
    Typography, 
    Container, 
    Button, 
    InputBase ,
    Stack
} from '@mui/material'


const Login = (props) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {isLoggedIn} = useSelector((state) => state.auth)
    const {message} = useSelector((state) => state.message)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])


    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        
        dispatch(login({email, password}))
            .unwrap()
            .then(() => {
                setEmail('')
                setPassword('')
                setLoading(false)
                props.history.push("/dashboard")
            })
            .catch(() => {
                setLoading(false)
            })
    }

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }

    return (

        <Container component={Grid} container sx={{p:0, mt:1}}>
            <Grid item textAlign='center'>
                <Typography fontFamily='Permanent Marker' variant='h4' sx={{mb:2}} >
                    Todo App
                </Typography>
            </Grid>
            <Card
                component={Grid} item
                xs={12} sm={8} md={6} lg={4}
                sx={{m: 'auto', borderRadius: 0, backgroundColor: '#fdfdfd', borderColor: '#000'}}
                variant='outlined'
            >
                <Grid container direction='column'>
                    <Grid item sx={{pb: 4, pt:4, backgroundColor: '#000'}}>
                        
                        <Typography variant='h4' fontWeight='bold' color='#fff' fontFamily='Cairo' textAlign='center'>
                            LOG IN
                        </Typography>
                    
                    </Grid>
                    <Grid 
                        item container direction='column' 
                        sx={{pt: 4, pb: 5}}
                        alignContent='center' spacing={2}
                    >
                        <Grid item >
                            <Stack>
                                <Typography fontFamily='Cairo' fontWeight='bold'>
                                    Email
                                </Typography>
                                <InputBase
                                    value={email}
                                    autoFocus
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    disabled={loading} 
                                    type='text' 
                                    sx={{ 
                                        fontFamily:'Cairo', 
                                        backgroundColor: '#cccccc', 
                                        px:0.8
                                    }} 
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs>
                            <Stack component='form' onSubmit={handleLogin}>
                                <Typography fontFamily='Cairo' fontWeight='bold'>
                                    Password
                                </Typography >
                                <InputBase 
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    disabled={loading} 
                                    type='password' 
                                    sx={{
                                        fontFamily:'Cairo', 
                                        backgroundColor: '#cccccc', 
                                        px:0.8
                                    }} 
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs textAlign='center' sx={{mt:2}}>
                            <Button 
                                disabled={loading}
                                onClick={handleLogin}
                                fullWidth 
                                variant='contained' 
                                sx={{
                                    backgroundColor: '#000', 
                                    borderRadius: 0, 
                                    ":hover": {backgroundColor:'#222'}
                                }}
                            >
                                Log in
                            </Button>
                        </Grid>
                        {message && (<Grid item xs textAlign='center' sx={{mt:2}}>
                            <Paper variant='outlined'  sx={{ borderRadius: 0, borderColor: 'red', p: 0.5}}>
                                <Typography color='red' fontWeight='bold' fontFamily='Raleway' variant='subtitle2'>
                                    {message}
                                </Typography>
                            </Paper>
                        </Grid>)}
                    </Grid>
                    <Grid item sx={{pt:2, backgroundColor: '#000'}}>
                        
                    </Grid>
                </Grid>
            </Card>
        </Container>

        // <div className={styles.container}>
        //     <div className={{width: 200}}>
        //         <h1>Login Page</h1>
        //         {
        //             message ? (<p className={styles.error}> {message}</p>) : (null)
        //         }
        //         <form>
        //             <div className={styles.loginForm}>
        //                 <div className={styles.loginFormItem}>
        //                     <label htmlFor="email">email</label>
        //                     <input type="text" id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}
        //                         disabled={loading}
        //                     />
        //                 </div>
        //                 <div className={styles.loginFormItem}>
        //                     <label htmlFor='password'>Password</label>
        //                     <input type='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} 
        //                         disabled={loading} 
        //                     />   
        //                 </div>
        //             </div>
        //             <button onClick={handleLogin} disabled={loading} >Login</button>
        //         </form>
        //     </div>
        // </div>
    )
}

export default Login