import React, { useEffect, useState } from 'react'
import { Divider, Box, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion, useIsPresent } from 'framer-motion'
import PropTypes from 'prop-types'
import ProfileShow from '../components/ProfileShow';
import ResumeProfileShow from '../components/ResumeProfileShow';
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCandidate } from '../store/reducers/candidateSlice'
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
                    <Box sx={{ p: 0 }}>{children}</Box>
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
    const dispatch = useDispatch()
    const { auth, member } = useSelector((state) => state.user)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        const { id } = member
        dispatch(getAllCandidate({ id }))
    }, [dispatch])
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: '#ffffff', display: 'flex', height: '800px' }}
        >
            <Tabs

                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', padding: '0rem' }}
            >
                <Tab label="Thông tin chungg" {...a11yProps(0)} />

                <Tab label="Kết quả phỏng vấn" />

                <Tab label="CV" {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileShow />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ResumeProfileShow />
            </TabPanel>
            <TabPanel value={value} index={2}>

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