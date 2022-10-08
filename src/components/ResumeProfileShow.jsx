import React, { useState, useEffect } from 'react'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { TableContainer, TableCell, TableBody, Table, TableRow, TableHead, Paper } from '@mui/material'
const ResumeProfileShow = () => {

    const candidateList = useSelector(state => state.candidate)
    console.log(candidateList);
    return (
        <div>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                CV
                            </TableCell>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                asdasd
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {
                            candidateList?.map((candidate) => (
                                <TableRow>{candidate.phone}</TableRow>
                            ))
                        } */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default ResumeProfileShow