import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// mui component
import { Box, Avatar, AppBar, Drawer, Toolbar, IconButton, Typography, ListItem, ListItemButton, ListItemText, Divider, List, SvgIcon, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { ReactComponent as FcodeIcon } from '../assets/logo/fcode.svg'
// mui icon
import MenuIcon from '@mui/icons-material/Menu';

import MarkunreadIcon from "@mui/icons-material/Markunread"
import PublicIcon from "@mui/icons-material/Public"
import HomeIcon from "@mui/icons-material/Home"
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import DropdownMenu from './DropdownMenu'
import MyButton from './MyButton';
import CollapseList from './CollapseList';
import { useSelector } from 'react-redux';
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
        name: 'Công việc khả dụng',
        link: '/job'
    },
    {
        name: 'Câu hỏi thường gặp',
        link: '/qa'
    }
]
const paperPropsAvatar = {
    elevation: 0,
    sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
}
const drawerWidth = 240;
const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const { member, auth } = useSelector((state) => {

        return state.user
    })


    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    function popupAvatar(e) {
        setAnchorEl(e.currentTarget)
        // console.log(anchorEl)
    }
    function closePopup() {
        setAnchorEl(null)
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
                        <Link to='/'>
                            <FcodeIcon style={{ width: '70px', height: '70px' }} />
                        </Link>
                    </Box>
                    <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
                        {navItems.map((item) => {
                            if (item.options) {
                                return <DropdownMenu key={item.name} hover={true} color={'black'} content={item.name} options={item.options} sx={{ margin: '0 1rem', fontSize: '15px' }} />
                            } else {
                                return <MyButton content={<Link to={item.link}>{item.name}</Link>} bgColor='#ffffff' key={item.name} sx={{ margin: '0 1rem', fontSize: '15px', textTransform: 'none', color: 'black' }} />
                            }
                        })}
                    </Box>
                    <Box sx={{ m: 2, display: { xs: 'none', md: 'block' } }}>

                        {
                            auth ? <>
                                <Tooltip title="Account settings">
                                    <IconButton sx={{ p: 0 }} onClick={popupAvatar}>
                                        <Avatar src={member.avatar} alt={member.fullname} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClick={closePopup}
                                    onClose={closePopup}
                                    PaperProps={paperPropsAvatar}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <MenuItem>
                                        <Avatar />
                                        <Link to='/profile'>Profile</Link>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <ListItemIcon>
                                            <ViewModuleOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        {/* Collections */}
                                        <Link to='/collection'>Collections</Link>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </> : <Link to='/auth'><MyButton size='large'
                                sx={{
                                    color: 'white', borderRadius: '10px', padding: '1 2rem',
                                    '&:hover': {
                                        backgroundColor: '#FBC115'
                                    }
                                }}

                                content='Đăng nhập'
                            />  </Link>
                        }


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
