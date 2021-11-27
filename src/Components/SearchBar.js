import React from 'react'
import { Paper, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

export default function SearchBar({ value, onChange, clearSearch, placeholder }) {

    return (
        <Paper 
            component='form' variant='outlined' 
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
            <SearchIcon sx={{mx:1}} htmlColor="#979AAF" fontSize='small' />
            <InputBase
                value={value}
                sx={{ ml: 1, flex: 1, color: '#979AAF'}}
                placeholder={placeholder}
                onChange={onChange}
            />
            {value ?
                <IconButton
                    title='clear'
                    onClick={clearSearch}
                    size='small'
                >
                    <ClearIcon htmlColor="#979AAF" fontSize='small' />
                </IconButton>
                : null
            }
        </Paper>
    )
}