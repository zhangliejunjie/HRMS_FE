import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import '../sass/components/_cardimage.scss'

export default function CardImage() {
    return (
        <div className='card-image'>
            <Typography sx={{ textAlign: "center", color: "#0F4C81", fontSize: "3rem", fontWeight: "bold", paddingTop: "2rem" }}>Very good offers waiting for you</Typography>
            <Typography sx={{ textAlign: "center", paddingTop: "2rem", padding: "25px 21rem 20px 21rem" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quos voluptates laudantium tempora consectetur? Perspiciatis impedit, quis consequuntur culpa quas facere praesentium. Perferendis dicta necessitatibus possimus modi consequatur alias nostrum!</Typography>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '2rem',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 300,
                    height: 500,
                },
            }}>
                <Paper elevation={3} sx={{ borderRadius: "15px", overflow: "hidden" }}>
                    <img className='card-image__image' src="../src/assets/imgs/woman.png" alt="picture" />
                    <div className='card-image__line'></div>
                    <Typography sx={{ padding: "20px 20px 0 34px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, delectus. Quia sed beatae ratione commodi autem, obcaecati eaque eveniet nesciunt labore dolor quas. Odit consequatur veniam cum laborum quidem libero!</Typography>
                </Paper>
                <Paper elevation={3} sx={{ borderRadius: "15px", overflow: "hidden" }}>
                    <img className='card-image__image' src="../src/assets/imgs/walk.png" alt="picture" />
                    <div className='card-image__line'></div>
                    <Typography sx={{ padding: "20px 20px 0 34px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, delectus. Quia sed beatae ratione commodi autem, obcaecati eaque eveniet nesciunt labore dolor quas. Odit consequatur veniam cum laborum quidem libero!</Typography>
                </Paper>
                <Paper elevation={3} sx={{ borderRadius: "15px", overflow: "hidden" }}>
                    <img className='card-image__image' src="../src/assets/imgs/look.png" alt="picture" />
                    <div className='card-image__line'></div>
                    <Typography sx={{ padding: "20px 20px 0 34px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, delectus. Quia sed beatae ratione commodi autem, obcaecati eaque eveniet nesciunt labore dolor quas. Odit consequatur veniam cum laborum quidem libero!</Typography>
                </Paper>
                <Paper elevation={3} sx={{ borderRadius: "15px", overflow: "hidden" }}>
                    <img className='card-image__image' src="../src/assets/imgs/coding.png" alt="picture" />
                    <div className='card-image__line'></div>
                    <Typography sx={{ padding: "20px 20px 0 34px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, delectus. Quia sed beatae ratione commodi autem, obcaecati eaque eveniet nesciunt labore dolor quas. Odit consequatur veniam cum laborum quidem libero!</Typography>
                </Paper>
            </Box>
        </div>
    )
}
