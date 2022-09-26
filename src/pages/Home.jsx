import React from 'react'
import HomeBanner from '../components/HomeBanner'
import SliderSection from '../components/SliderSection'
import { Box, Typography } from '@mui/material'
const Home = () => {
    return (
        <Box>
            <HomeBanner />
            <SliderSection />
        </Box>
    )
}

export default Home