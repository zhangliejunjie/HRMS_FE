import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReport } from '../store/reducers/reportSlice';
import { Page } from 'react-pdf';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';




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
                            <Typography sx={{ mt: 5 }}>Room: {n?.room}</Typography>
                            <Typography>Slot: {n?.slot}</Typography>
                            <Typography>Week: {n?.week}</Typography>
                            <Typography>Job position: {n?.job_title}</Typography>
                        </Box>

                    </Paper>

                </Box>

            )
            }
        </>
    )
}
