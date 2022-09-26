import React from 'react'
import { Container, Box, TextField, Select, MenuItem, Stack, Button, InputAdornment, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search';
import MyAnimateSelect from './MyAnimateSelect'
import MyButton from './MyButton';

import model from '../assets/components/model.png'
import yellow_circle from '../assets/components/Components_7.png'
import green_balloon from '../assets/components/Components_8.png'
import green_ease_square from '../assets/components/Components_3.png'
import green_arrow from '../assets/components/Components_1.png'

import MyInput from './MyInput';


const options = [
    'Fresher',
    'Junior',
    'Senior'
]



const HomeBanner = () => {

    return (
        <div className='homebanner-container'>
            <div className='homebanner' mt={3}>
                <Box className="homebanner__left">
                    <Box className='homebanner__left__content'>
                        <Typography variant='h3' color='white'>
                            Start a career where you
                            strive toward the better every day.
                        </Typography>
                        <Stack mt={3}>
                            {/* <TextField

                            id="input-with-icon-textfield"
                            placeholder='Search Jobs'
                            sx={{
                                width: '80%',
                            }}

                            InputProps={{
                                style: {
                                    borderRadius: '10px',
                                    backgroundColor: '#ffffff',
                                    "&:hover": {
                                        backgroundColor: "pink",
                                        borderStyle: 'none'
                                    },

                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: '#111111' }} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"

                        /> */}
                            <MyInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: '#111111' }} />
                                    </InputAdornment>
                                }
                            />
                        </Stack>
                        <Stack direction='row' alignItems='start' mt={2} spacing={1}>
                            <Stack>
                                <MyAnimateSelect content='Kinh nghiệm' options={options} />
                            </Stack>
                            <Stack>
                                <MyButton content='Tìm kiếm' size='large' bgColor='#FBC115'
                                    sx={{
                                        color: '#ffffff',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            backgroundColor: '#45CE7C'
                                        }
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box className="homebanner__right">
                    <div className='homebanner__right__container'>
                        <motion.div className="homebanner__right__model"
                            style={{ backgroundImage: `url(${model})` }}
                            initial={{ y: 20, opacity: 1 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />

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
                    </div>
                </Box>
            </div>
        </div>
    )
}


export default HomeBanner