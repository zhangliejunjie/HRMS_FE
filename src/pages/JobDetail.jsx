import { Modal, ModalClose, ModalDialog } from '@mui/joy'
import { Button, Typography, Box, Divider, Stack, Chip, Container, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createCandidate } from '../store/reducers/candidateSlice'
import { error } from '../store/reducers/notificationSlice'
import '../sass/components/_jobcarddetail.scss'
const JobDetail = () => {
    const { jobs } = useSelector(state => state.job)
    const { candidates } = useSelector(state => state.candidate)
    const { auth, member } = useSelector(state => state.user)

    const { jobId } = useParams()
    const thisJob = jobs.find(job => job.id === jobId)
    const jobApplied = candidates?.find((candidate) => candidate.job_name === thisJob.name);
    const [openModals, setOpenModals] = useState(false)
    const [pdfURL, setPdfURL] = useState("")
    const dispatch = useDispatch()
    const nav = useNavigate()
    console.log(thisJob)
    const handleChangeSubmitCV = async (files) => {
        console.log(files);
        const selectedFile = files[0]


        if (selectedFile) {
            let reader = new FileReader()

            reader.readAsDataURL(selectedFile)
            reader.onload = (e) => {
                // setPdf(e.target.result)
            }

            const formData = new FormData()
            formData.append("file", selectedFile)
            formData.append("upload_preset", "hrms_client")


            const { data } = await axios.post("https://api.cloudinary.com/v1_1/sangtran127/image/upload", formData)

            setPdfURL(data.url)
            console.log(pdfURL);
        }

    }
    const handleSubmitJob = (id) => {

        const job_id = id;
        const my_resume_url = pdfURL ? pdfURL : null
        if (!member.current_resume_url && !pdfURL) {
            dispatch(error('You need to provide your CV profile first'));
            return;
        }
        if (!member.phone) {
            dispatch(error('You need to provide your phone first'))
            return;
        }


        dispatch(createCandidate({ member, job_id, my_resume_url }))
    }
    return (
        <Container sx={{ minHeight: "100vh", background: "linear-gradient(to top, #EDEADE 0%, #FFFF 100%)" }}>
            <Box p={5}>
                <Paper sx={{ borderRadius: "12px" }}>

                    <div className='job-carddetails'>
                        {/* <p>{jobApplied ? 'Already applied' : null}</p> */}
                        <h3 className='job-carddetails__title'>
                            {thisJob.name}</h3>
                        <div className="job-carddetails__detail">
                            <Typography>  {thisJob.experience}</Typography>
                            <Divider orientation="vertical" variant="fullWidth" flexItem />
                            <Typography>  {thisJob.category}</Typography>
                            <Divider orientation="vertical" variant="fullWidth" flexItem />

                            <Typography> {thisJob.quantity}</Typography>
                            <Divider orientation="vertical" variant="fullWidth" flexItem />
                            <Typography> {thisJob.salary}$</Typography>
                            <Divider orientation="vertical" variant="fullWidth" flexItem />
                            <div className="job-carddetails__detail__date">
                                <Typography> {thisJob.start_date}</Typography>
                            </div>
                        </div>
                        <Stack className="job-carddetails__bottom" direction="row" justifyContent="space-between">
                            {thisJob.isRemote ?
                                <div className='job-carddetails__bottom__remote'>
                                    <Chip label='Có thể làm Remote' sx={{
                                        color: '#efc254',
                                        bgcolor: 'rgba(239,194,84,.1)'
                                    }} />
                                </div>
                                : null}

                            {
                                jobApplied && auth ? (
                                    <Button color="success" variant='outlined' disabled className="job-carddetails__bottom__apply" sx={{ ml: 'auto' }}>
                                        Already applied
                                    </Button>
                                ) :
                                    (
                                        <Button onClick={() => setOpenModals(true)} color="success" variant='contained' className="job-carddetails__bottom__apply" sx={{ ml: 'auto' }}>
                                            Apply now
                                        </Button>
                                    )
                            }

                        </Stack>
                        <div className='job-carddetails__line'></div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant='h5'>More information about {thisJob.name} </Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Typography>{thisJob.description}</Typography>


                            </AccordionDetails>
                        </Accordion>

                    </div>
                    <Modal open={openModals} onClose={() => setOpenModals(false)} hideBackdrop>
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
                                        <Typography mb={2} component='h1' textAlign='center' variant='h5' fontWeight={"bold"}>{thisJob.name}</Typography>
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
                                                onChange={(event) => {
                                                    // console.log(event.target.files);
                                                    handleChangeSubmitCV(event.target.files)
                                                }}
                                            />
                                            <p> <span style={{ color: 'red' }}>*</span> If you want to apply with another CV, please upload.</p>
                                        </Stack>
                                        <Stack>
                                            <Button sx={{ ml: 'auto' }} color="success" variant='outlined' onClick={() => { handleSubmitJob(thisJob.id); setOpenModals(false); console.log(thisJob.id) }}>Confirm</Button>
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

                </Paper>

            </Box>

        </Container>

    )
}

export default JobDetail