import React, { useEffect, useState } from 'react'
import { Divider, Box, Typography, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion, useIsPresent } from 'framer-motion'
import PropTypes from 'prop-types'
import ProfileShow from '../components/ProfileShow';
import ResumeProfileShow from '../components/ResumeProfileShow';
import Loader from '../components/Loader'
import CvList from '../components/CvList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCandidate } from '../store/reducers/candidateSlice'
import Body from '../components/Body/Body'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 3, width: '100%' }}>
                    <Box sx={{ p: 0, width: '100%' }}>{children}</Box>
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
            sx={{ flexGrow: 1, bgcolor: '#ffffff', display: 'flex', height: '800px', width: '100%' }}
        >
            <Tabs

                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', padding: '0rem' }}
            >
                <Tab label="General Info" {...a11yProps(0)} />

                <Tab label="CV List" {...a11yProps(2)} />
                <Tab label="Resume Builder" />
                <Tab label="Result" />

            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileShow />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <CvList />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Body />

            </TabPanel>
            <TabPanel value={value} index={3}>
                <ResumeProfileShow />

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