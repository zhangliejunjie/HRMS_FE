import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// mui component
import { Box, Avatar, AppBar, Drawer, Toolbar, IconButton, Typography, ListItem, ListItemButton, ListItemText, Divider, List, SvgIcon } from '@mui/material'
import { ReactComponent as FcodeIcon } from '../assets/logo/fcode.svg'
// mui icon
import MenuIcon from '@mui/icons-material/Menu';



import DropdownMenu from './DropdownMenu'
import MyButton from './MyButton';
import CollapseList from './CollapseList';
const navItems = [
    {
        name: 'Vị trí ứng tuyển',
        options: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Mobile Developer', 'QA/QC'],
        link: '/'
    },
    {
        name: 'Kinh nghiệm làm việc',
        options: ['Fresher', 'Junior', 'Senior'],
        link: '/about'
    },
    {
        name: 'Tra cứu kết quả',
        link: '/about'
    },
    {
        name: 'Câu hỏi thường gặp',
        link: '/qa'
    }
]
const drawerWidth = 240;
const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={handleDrawerToggle} >
                X
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>

                            {item.options ?
                                <CollapseList content={item.name} options={item.options} />
                                : <ListItemText primary={item.name} />
                            }

                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <Box className='header' sx={{ boxShadow: 'none' }}>
            <AppBar position="sticky" component='nav' sx={{ padding: { lg: '0 10rem', sm: '0 2rem', xs: 'none' }, bgcolor: '#ffffff' }} color='transparent'>
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }}>
                        <FcodeIcon style={{ width: '70px', height: '70px' }} />
                    </Box>
                    <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
                        {navItems.map((item) => {
                            if (item.options) {
                                return <DropdownMenu key={item.name} hover={true} color={'black'} content={item.name} options={item.options} sx={{ margin: '0 1rem', fontSize: '15px' }} />
                            } else {
                                return <MyButton content={item.name} bgColor='#ffffff' key={item.name} sx={{ margin: '0 1rem', fontSize: '15px', textTransform: 'none', color: 'black' }} />
                            }
                        })}
                    </Box>
                    <Box sx={{ m: 2, display: { xs: 'none', md: 'block' } }}>
                        <Link to='/auth'>
                            <MyButton size='large'
                                sx={{
                                    color: 'white', borderRadius: '10px', padding: '1 2rem',
                                    '&:hover': {
                                        backgroundColor: '#FBC115'
                                    }
                                }}

                                content='Đăng nhập'
                            />
                        </Link>
                    </Box>
                    <IconButton onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none', sm: 'block' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box component='nav'>
                <Drawer
                    anchor='right'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box >
    )
}

export default Header
