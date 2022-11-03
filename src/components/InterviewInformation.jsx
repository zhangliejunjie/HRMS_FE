import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from '../store/reducers/reportSlice';
import { Page } from 'react-pdf';
import { Box, Button, Paper, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import { getDateOfISOWeek } from '../utils/tool'



export default function InterviewInformation(
    { candidateId }
) {
    const dispatch = useDispatch()
    const { candidates } = useSelector((state) => state.candidate)
    const { report } = useSelector((state) => state.report)
    useEffect(() => {
        dispatch(getReport(candidateId))
    }, [])

    return (
        <>
            {report?.map(n =>
                <Box p={5}>
                    <Paper>
                        <Box p={5}>
                            <Typography variant='h3' sx={{ textAlign: "center" }}>Important</Typography>
                            <Typography sx={{ mt: 5 }} variant='h6'>Time: {getDateOfISOWeek(n?.week, n?.slot).toLocaleDateString()}</Typography>
                            <Typography variant='h6'>Slot: {n?.slot}</Typography>
                            <Typography variant='h6'>Week: {n?.week}</Typography>
                            <Typography variant='h6'>Job position: {n?.job_title}</Typography>
                            <Typography variant='h6'> Type: {n?.type}</Typography>
                            {n?.type === 'Offline' && <Typography variant='h6'>Room: {n?.room}</Typography>}
                            <Stack direction='row' spacing={3} alignItems='center'>
                                <Typography variant='h6'>Meeting url:</Typography>
                                <Button variant='contained' color='success'>
                                    <a href={n?.join_url} target='_blank' ><span color='green'>join now</span></a>
                                </Button>
                            </Stack>
                        </Box>

                    </Paper>

                </Box>

            )
            }
        </>
    )
}
