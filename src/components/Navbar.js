import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingBasketIcon color="primary" fontSize="large" />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                        Product Manager
                    </Typography>
                </Box>
                <Box>
                    {token ? (
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={handleLogout}
                            sx={{ borderRadius: '20px' }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button 
                                component={Link} 
                                to="/login" 
                                sx={{ mr: 2, color: 'text.primary' }}
                            >
                                Login
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component={Link} 
                                to="/signup"
                                sx={{ borderRadius: '20px' }}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;