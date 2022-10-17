import React, { useState, useEffect } from 'react'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { TableContainer, TableCell, TableBody, Table, TableRow, TableHead, Paper, Button, Typography } from '@mui/material'
// import SearchBar from 'material-ui-search-bar'

import { styled, alpha } from '@mui/material/styles';
import { getAllCandidate } from '../store/reducers/candidateSlice';




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
        <div>

            {/* <Search /> */}
            <TableContainer component={Paper}>
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
                                        {candidate.job_name}
                                    </TableCell>
                                    <TableCell>
                                        <button><a href={candidate.resume_url} target="_blank">Your CV</a></button>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="ghost" color={candidate.applied_status === 'Approve' ? 'green' : candidate.applied_status === 'Reject' ? 'error' : null}>
                                            {candidate.applied_status}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default ResumeProfileShow