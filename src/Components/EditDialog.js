import React,{useState} from "react"


import { Typography, Divider, InputBase, Dialog, Stack } from '@mui/material'

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

export default EditDialog