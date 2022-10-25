import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@mui/material'
import PDFView from './PDFView'

const CvList = () => {
    const { candidates } = useSelector(state => state.candidate)
    return (
        <Box sx={{ p: 4, width: '100%' }}>
            <Typography component='h4' variant='h3' textAlign='center' mb={4}>CV List</Typography>
            <Grid container spacing={3}>
                {
                    candidates?.map((candidate) => (
                        <Grid item lg={12} xl={6} md={12} key={candidate.job_name}>
                            <Box style={{
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                borderRadius: '10px'
                            }}>
                                <Typography textAlign={'center'} mt={1} component='h4' variant="h5" mb={2}>{candidate.job_name}</Typography>
                                <PDFView pdf={candidate.resume_url} m={1} />
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>

        </Box>
    )
}

export default CvList