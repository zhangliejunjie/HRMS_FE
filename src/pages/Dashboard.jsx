import React, { useState } from 'react'
import { Drawer, Toolbar, Divider, List, ListItem, Box, ListItemIcon, ListItemText, ListItemButton, Typography, AppBar, Tabs, Tab } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { motion, useIsPresent } from 'framer-motion'
import PropTypes from 'prop-types'
import ProfileShow from '../components/ProfileShow';
import Loader from '../components/Loader'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};




function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}





const Dashboard = () => {
    const [value, setValue] = useState(0);
    const isPresent = useIsPresent();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '800px' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Thông tin chungg" {...a11yProps(0)} />
                <Divider />
                <Tab label="Kết quả phỏng vấn" {...a11yProps(1)} />
                <Divider />
                <Tab label="CV" {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileShow />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <Loader /> */}
                asd
            </TabPanel>
            <TabPanel value={value} index={2}>
                {/* <Loader /> */}
                sdf
            </TabPanel>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
                exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
                style={{ originX: isPresent ? 0 : 1 }}
                className="privacy-screen"
            ></motion.div>
        </Box>
    );

}

export default Dashboard