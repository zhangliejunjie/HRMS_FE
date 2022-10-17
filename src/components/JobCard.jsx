import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { Divider, Chip, Stack, Button, Box } from '@mui/material'
import { Modal, ModalClose, Typography, ModalDialog } from '@mui/joy';
import { useSelector } from 'react-redux';
const JobCard = ({ id, name, start_date, end_date, quantiy, salary = 'Deal later', team, type, isRemote, handleClick, openModal, auth, onClose, handleChangeInputCV, handleSubmitJob }) => {
    const nav = useNavigate()
    const { candidates } = useSelector(state => state.candidate)
    const jobApplied = candidates?.find((candidate) => candidate.job_name === name);
    return (
        <>
            <div className='job-card'>
                {/* <p>{jobApplied ? 'Already applied' : null}</p> */}
                <h3 className='job-card__title'>{name}</h3>
                <div className="job-card__detail">
                    <Typography>  {type}</Typography>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                    <Typography>  {team}</Typography>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />

                    <Typography> {quantiy}</Typography>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                    <Typography> {salary}$</Typography>
                    <Divider orientation="vertical" variant="fullWidth" flexItem />
                    <div className="job-card__detail__date">
                        <Typography> {start_date}</Typography>
                    </div>
                </div>
                <Stack className="job-card__bottom" direction="row" justifyContent="space-between">
                    {isRemote ?
                        <div className='job-card__bottom__remote'>
                            <Chip label='Có thể làm Remote' sx={{
                                color: '#efc254',
                                bgcolor: 'rgba(239,194,84,.1)'
                            }} />
                        </div>
                        : null}

                    {
                        jobApplied ? (
                            <Button color="success" variant='outlined' disabled className="job-card__bottom__apply" sx={{ ml: 'auto' }}>
                                Already applied
                            </Button>
                        ) :
                            (
                                <Button onClick={handleClick} color="success" variant='contained' className="job-card__bottom__apply" sx={{ ml: 'auto' }}>
                                    Apply now
                                </Button>
                            )
                    }

                </Stack>
            </div>
            <Modal open={openModal} onClose={onClose} hideBackdrop>
                <ModalDialog
                    color="success"
                    variant="outlined"

                    sx={{
                        maxWidth: 500,
                        borderRadius: 'sm',
                        p: 5,
                        boxShadow: 'lg',
                        bgcolor: '#ffffff'
                    }}
                >
                    <ModalClose
                    />
                    {
                        auth ? (
                            <Box>
                                <Typography mb={2} component='h1' textAlign='center' variant='h1'>{name}</Typography>
                                <Divider></Divider>
                                <Stack mt={2}>
                                    Upload your CV
                                </Stack>
                                <Stack>
                                    <input
                                        // ref={inputFileRef}
                                        style={{
                                            display: 'block'
                                        }}
                                        accept="application/pdf"
                                        hidden
                                        id="cv-pdf-upload"
                                        type="file"
                                        onChange={(event) => handleChangeInputCV(event.target.files)}
                                    />
                                    <p> <span style={{ color: 'red' }}>*</span> If you want to apply with another CV, please upload.</p>
                                </Stack>
                                <Stack>
                                    <Button sx={{ ml: 'auto' }} color="success" variant='outlined' onClick={() => handleSubmitJob(id)}>Confirm</Button>
                                </Stack>
                            </Box>
                        ) : (
                            <>
                                <Typography
                                    component="h2"
                                    id="modal-title"
                                    level="h4"
                                    textColor="inherit"
                                    fontWeight="lg"
                                    mb={1}
                                >
                                    You need to Login to apply this job
                                </Typography>
                                <Stack>
                                    <Button sx={{ ml: 'auto' }} color="success" onClick={() => nav('/auth')}>Login</Button>
                                </Stack>
                            </>
                        )
                    }
                </ModalDialog>

            </Modal>
        </>
    )
}

JobCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    // end_date: PropTypes.string.isRequired,
    quantiy: PropTypes.number.isRequired,
    salary: PropTypes.string,
    handleClick: PropTypes.func.isRequired
    // team: PropTypes.string.isRequired,
    // type: PropTypes.oneOf(['Experienced', 'Intern', 'Fresher']).isRequired,
    // isRemote: PropTypes.bool.isRequired
}

export default JobCard