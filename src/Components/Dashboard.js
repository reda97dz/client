import React, {useEffect, useState} from "react"
import {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux" 
import moment from 'moment'

import userService from "../services/user.service"

import NotesSharpIcon from '@mui/icons-material/NotesSharp'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import MoreHorizSharp from '@mui/icons-material/MoreHorizSharp'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import RuleSharpIcon from '@mui/icons-material/RuleSharp'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import EditSharpIcon from '@mui/icons-material/EditSharp'
import AssignmentLateSharpIcon from '@mui/icons-material/AssignmentLateSharp';
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';

import { 
    Grid, 
    Paper, 
    Card, 
    Typography, 
    Container, 
    Button, 
    Divider,
    Chip,
    Checkbox,
    InputBase ,
    IconButton, 
    Dialog,
    DialogTitle,
    Stack
} from '@mui/material'

const EditDialog = ({open, handleEdit, handleClose, todo}) => {
    const [newText, setNewText] = useState('')

    const editTodo = (e) => {
        e.preventDefault()
        handleEdit(todo.id, {text: newText})
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            
            <Stack component='form' onSubmit={editTodo} sx={{mx:1, mb:2}}>
                <Typography fontFamily='Cairo' variant='h6'>
                    Editing Todo {todo.id}
                </Typography>
                <Divider />
                <Typography fontFamily='Cairo' fontWeight='bold' sx={{mt:1}}>
                    New Text
                </Typography>
                <InputBase
                    value={newText}
                    onChange={(e)=>{setNewText(e.target.value)}}
                    type='text' 
                    sx={{ 
                        fontFamily:'Cairo', 
                        backgroundColor: '#cccccc', 
                        px:0.8
                    }} 
                />
            </Stack>
        </Dialog>
    )
}


const Dashboard = () => {
    const {user: currentUser} = useSelector((state) => state.auth)
    const [todos, setTodos] = useState([])
    const [todoText, setTodoText] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const [editTodo, setEditTodo] = useState({})

    const [openDialog, setOpenDialog] = React.useState(false)

    const handleDialogOpen = (todo) => {
        setEditTodo(todo)
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    useEffect(() => {
        getTodos()
    }, [])

    async function getTodos(){
        try{
            const res = await userService.getTodos()
            setTodos(res.data)
        }catch(error){
            console.log(error)
        }
    }

    if (!currentUser){
        return <Navigate to='/' />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await userService.addTodo({text: todoText})
            setTodos(todos.concat(res.data))
            setTodoText('')
        }catch(error){
            console.log(error)
        }
    }

    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDelete = (id) => {
        try{
            userService.removeTodo(id)
            setTodos(todos.filter(todo=>(todo.id)!==id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (id, newTodo) => {
        const editedTodo = await userService.editTodo(id, newTodo)
        setTodos(todos.map(todo => todo.id !== id ? todo : editedTodo.data))
    }

    const handleDoneChange = async (todo) => {
        const editedTodo = await userService.editTodo(todo.id, {done: !todo.done})
        setTodos(todos.map(t => t.id !== todo.id ? t : editedTodo.data))
    }

    return (

        <>
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
                            {moment().format('dddd')}
                        </Typography>
                        <Typography variant='body2' fontFamily='Cairo' fontWeight='bold' color='#353745'>
                            {moment().format('MMM DD, YYYY')}
                        </Typography>
                    </Grid>

                    <Grid item width='85%' sx={{pb:4}}>
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
                            onSubmit={handleSubmit}
                        >
                            <NotesSharpIcon fontSize='small' htmlColor='#979AAF' sx={{mx:1}} />
                            <InputBase
                                sx={{ml: 1, flex: 1, color: '#979AAF'}}
                                placeholder= "Add a task..."
                                value={todoText}
                                onChange={(e)=>setTodoText(e.target.value)}
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

                    <Paper
                        component={Grid}
                        width='85%'
                        item
                        container
                        direction='column'
                        elevation={0}
                        sx={{
                            p:0.5,
                            borderRadius: 0,
                            backgroundColor: 'transparent',
                            // borderColor: '#2C2E3A',
                            alignItems: 'center'
                        }}
                        spacing={2}
                    >
                        {todos.length === 0 ? <p>Nothing to see here</p> :
                        todos.map((todo)=>{
                            return(
                                <Grid key={todo.id} item container direction='row'>
                                    <Grid item xs={2} md={1} textAlign='left' sx={{mt:0.4}}>
                                        <IconButton onClick={()=>handleDoneChange(todo)} size='small'>
                                            {/* <MoreHorizSharp fontSize='small' htmlColor='#979AAF' /> */}
                                            {todo.done ? <AssignmentTurnedInSharpIcon /> : <AssignmentLateSharpIcon />  }
                                        </IconButton>
                                        
                                        {/* <Checkbox size='small' 
                                            sx={{
                                                color: "#2C2E3A",
                                                '&.Mui-checked': {
                                                    color: "#2C2E3A"
                                                }
                                            }}
                                            checked={todo.done}
                                            disabled
                                            // onChange={}
                                        /> */}
                                    </Grid>
                                    <Grid item xs container direction='column'>
                                        <Grid item>
                                            <Typography fontFamily='Cairo' variant='body1' fontWeight='bold' color="#ECF8F8" >
                                                {todo.text}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography fontFamily='Cairo' fontWeight='bold' variant='subtitle2' color='#353745'>
                                                {moment(todo.created_at).format('dddd, MMM DD, Y')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={2} md={1} item textAlign='center'>
                                        <IconButton onClick={handleClick} size='small'>
                                            <MoreHorizSharp fontSize='small' htmlColor='#979AAF' />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            PaperProps={{
                                                elevation: 1,
                                                sx: {
                                                    borderRadius: 0,
                                                    backgroundColor: '#353745',
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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
                                                        bgcolor: '#353745',
                                                        transform: 'translateY(-50%) translateX(30%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >
                                                <MenuItem sx={{color: '#979AAF', py: 0}} onClick={()=>handleDoneChange(todo)}>
                                                    <ListItemIcon >
                                                        <RuleSharpIcon htmlColor='#979AAF' fontSize="small" />
                                                    </ListItemIcon>
                                                    Mark as {todo.done ? `Undone` : `Done`}
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem sx={{color: '#979AAF', py: 0}} onClick={()=>handleDialogOpen(todo)}>
                                                    <ListItemIcon >
                                                        <EditSharpIcon htmlColor='#979AAF' fontSize="small" />
                                                    </ListItemIcon>
                                                    Edit
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem sx={{color: '#90323D', py: 0}} onClick={()=>handleDelete(todo.id)}>
                                                    <ListItemIcon >
                                                        <DeleteForeverSharpIcon htmlColor='#90323D' fontSize="small" />
                                                    </ListItemIcon>
                                                    Delete
                                                </MenuItem>
                                            </Menu>
                                    </Grid>
                                </Grid>
                            )
                        })}

                    </Paper>

                 </Card>
            </Container>
            <EditDialog 
                open={openDialog}
                handleEdit={handleEdit}
                handleClose={handleDialogClose}
                todo={editTodo}
            />
        </>
    )
}

export default Dashboard