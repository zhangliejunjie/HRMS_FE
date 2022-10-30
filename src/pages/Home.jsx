import React from 'react'
import HomeBanner from '../components/HomeBanner'
import SliderSection from '../components/SliderSection'
import CenterContent from '../components/CenterContent'


import { Box, Typography } from '@mui/material'
const Home = () => {
    const embedId = "-XsRLyKV9_k";
    return (
        <Box>
            <HomeBanner />
            <SliderSection />
            <CenterContent embedId={embedId} />
        </Box>
    )
}

export default Home