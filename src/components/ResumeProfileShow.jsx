import React, { useState, useEffect } from 'react'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { TableContainer, TableCell, TableBody, Table, TableRow, TableHead, Paper, Box, Typography } from '@mui/material'
import { Button } from '@mui/joy';
// import SearchBar from 'material-ui-search-bar'

import { styled, alpha } from '@mui/material/styles';
import { getAllCandidate } from '../store/reducers/candidateSlice';
import ResultStepper from './ResultStepper';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));





const ResumeProfileShow = () => {
    const { candidates } = useSelector(state => state.candidate)
    const { member } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { id } = member
    console.log(id);
    // dispatch(getAllCandidate({ id }))
    const [rows, setRows] = useState(candidates)
    const [search, setSearch] = useState("")
    const requestSearch = (searchValue) => {
        const filterRows = candidates.filter((candidate) => candidate.job.toLowerCase().includes(searchValue.toLowerCase()))
        setRows(filterRows)
    }
    const cancelSearch = () => {
        setSearch("");
        requestSearch(search);
    };
    useEffect(() => {
        const { id } = member
        console.log(id);
        dispatch(getAllCandidate({ id }))
    }, [])
    console.log(candidates);
    return (
        <Box style={{
            width: '100%',
            padding: '3rem'
        }}>
            <Typography component='h1' variant='h5' mb={3}>CV Result</Typography>
            {/* <Search /> */}
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Job title
                            </TableCell>
                            <TableCell>
                                Your CV
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows?.map((candidate) => (
                                <TableRow>
                                    <TableCell>
                                        <Typography variant='h6'>
                                            {candidate.job_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='outlined' color='success'>
                                            <a href={candidate.resume_url} target="_blank">Your CV</a>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="button" color={candidate.applied_status === 'Approve' ? 'green' : candidate.applied_status === 'Reject' ? 'error' : null}>
                                            {candidate.applied_status}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={3}>
                <Typography component='h1' variant='h5' mb={3}>Overall Status</Typography>
                <ResultStepper step={0} />
            </Box>
        </Box>
    )

}

export default ResumeProfileShow