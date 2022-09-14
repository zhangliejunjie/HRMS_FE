import React from 'react'
import { Container, Box, TextField, Select, MenuItem, Stack, Button, InputAdornment } from '@mui/material'
import { motion } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search';
import MyAnimateSelect from './MyAnimateSelect'

import model from '../assets/components/model.png'
import yellow_circle from '../assets/components/Components_7.png'
import green_balloon from '../assets/components/Components_8.png'
import green_ease_square from '../assets/components/Components_3.png'
import green_arrow from '../assets/components/Components_1.png'




const options = [
    'Fresher',
    'Junior',
    'Senior'
]


const HomeBanner = () => {
    return (
        <Box className='homebanner' mt={3}>
            <Box className="homebanner__left">
                <Box>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search Jobs"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <Stack direction='row'>
                        <MyAnimateSelect content='nam kinh nghiem' options={options} />
                        <Button>Search</Button>
                    </Stack>
                </Box>
            </Box>
            <Box className="homebanner__right">
                <motion.div className="homebanner__right__model"
                    style={{ backgroundImage: `url(${model})` }}
                    initial={{ y: 20, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 1 }}
                    transition={{ duration: 0.5 }} />

                <motion.div className="homebanner__right__yellow-circle"
                    style={{ backgroundImage: `url(${yellow_circle})` }}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                />
                <motion.div className="homebanner__right__green-ease-square"
                    style={{ backgroundImage: `url(${green_ease_square})` }}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 1 }}
                />
                <motion.div className="homebanner__right__green-arrow" style={{ backgroundImage: `url(${green_arrow})` }}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 1 }}

                />
                <motion.div className="homebanner__right__green-balloon"
                    style={{ backgroundImage: `url(${green_balloon})` }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: [null, 1.5, 1.4] }}


                />
            </Box>
        </Box>
    )
}


export default HomeBanner