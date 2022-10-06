import React, { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import { Pagination, Stack, Button } from '@mui/material'
import { Modal, ModalClose, Typography, ModalDialog } from '@mui/joy';

import bg from '../assets/utils/bg.png'
import MyButton from '../components/MyButton'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getJobList } from "../store/reducers/jobSlice"
import Loader from '../components/Loader'
import usePagination from '../hooks/usePagination';
// const jobList = [
//     {
//         id: 'j01',
//         name: '.NET Software Architect',
//         salary: '1.000$',
//         quantity: 1,
//         start_date: new Date(2022, 10),
//         end_date: new Date(2022, 11),
//         team: 'Engineering',
//         type: 'Experienced',
//         isRemote: true,
//     },
//     {
//         id: 'j02',
//         name: 'Senior Regional Business Development Manager',
//         salary: '1.000$',
//         quantity: 2,
//         start_date: new Date(2022, 10),
//         end_date: new Date(2022, 11),
//         team: 'Business Deveplopment',
//         type: 'Experienced',
//         isRemote: false,
//     },
//     {
//         id: 'j03',
//         name: 'Digital Content Intern.',
//         salary: '1.000$',
//         quantity: 4,
//         start_date: new Date(2022, 10),
//         end_date: new Date(2022, 11),
//         team: 'Business Deveplopment',
//         type: 'Intern',
//         isRemote: false,
//     },
//     {
//         id: 'j04',
//         name: 'Software Test Engineer Intern (QA/QC/Tester)',
//         salary: '1.000$',
//         quantity: 1,
//         start_date: new Date(2022, 10),
//         end_date: new Date(2022, 11),
//         team: 'Engineering',
//         type: 'Intern',
//         isRemote: true,
//     },
//     {
//         id: 'j05',
//         name: 'Technical Writer.',
//         salary: '1.000$',
//         quantity: 1,
//         start_date: new Date(2022, 10),
//         end_date: new Date(2022, 11),
//         team: 'Product Manager',
//         type: 'Experienced',
//         isRemote: false,
//     },
//     {
//         id: 'j06',
//         name: 'IT Helpdesk Engineer.',
//         // salary: null,
//         quantity: 8,
//         start_date: new Date(2022, 10),
//         end_date: new Date(2022, 11),
//         team: 'Engineering',
//         type: 'Experienced',
//         isRemote: false,
//     }

// ]

const Job = () => {

    const initFilter = {
        type: [],
        team: [],
    }

    const dispatch = useDispatch()
    const nav = useNavigate()

    const { jobs } = useSelector(state => state.job)
    const { auth } = useSelector(state => state.user)

    const [openModal, setOpenModal] = useState(false)
    const [page, setPage] = useState(1)
    const jobPerPage = 4;
    const count = Math.ceil(jobs.length / jobPerPage)
    const data = usePagination(jobs, jobPerPage)
    const [jobList, setJobList] = useState(data.currentData())
    const [filter, setFilter] = useState(initFilter)
    const handleChange = (e, p) => {

        setPage(p);
        data.jump(p);
        // setJobList(data.currentData())
    };


    useEffect(() => {
        setJobList(jobs)
    }, [jobs])

    function handleClickApply() {
        if (!auth) {

            setOpenModal(true)
            return
        }
        alert('applied')
    }
    return (
        <>
            <div className="job">
                <div className='job-container'
                    style={{
                        // backgroundImage: `url(${bg})`
                    }}
                >
                    <div className="job-container__left">
                        <h1>Job  Openings</h1>
                        <Typography variant='h5'>Let's find a suitable position to start your
                            Fresher journey with FCode!
                        </Typography>
                        <MyButton content={"Tìm việc"} />
                    </div>
                    <div className="job-container__right">
                        <div className="job-container__right__job-card">
                            {
                                jobList ? data.currentData().map((job) => (
                                    <JobCard
                                        id={job.id}
                                        key={job.id}
                                        name={job.name}
                                        quantiy={job.quantity}
                                        salary={job.salary}
                                        start_date={job.start_date}
                                        // end_date={job.end_date}
                                        team={job.category}
                                        type={job.experience}
                                        isRemote={job.isRemote}
                                        handleClick={handleClickApply}
                                    />
                                )) : <Loader />
                            }
                        </div>
                        <Pagination count={count}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange} />
                    </div>
                </div>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Bạn cần phải đăng nhập hệ thống để ứng tuyển
                    </Typography>
                    <Stack>
                        <Button sx={{ ml: 'auto' }} color="success" onClick={() => nav('/auth')}>Đăng nhập</Button>
                    </Stack>
                </ModalDialog>

            </Modal>
        </>
    )
}

export default Job