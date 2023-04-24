//import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export default function ButtonAppBar() {
    const navigate= useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" sx={{ backgroundColor: '#651fff' }} style={{cursor:'pointer'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <SupervisorAccountIcon fontSize='large'/>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 0 }} onClick={()=> navigate('/')}>
                        HR PORTAL
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}





