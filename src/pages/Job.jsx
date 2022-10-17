import React, { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import { Pagination, Stack, Button, Box } from '@mui/material'
import { Modal, ModalClose, Typography, ModalDialog } from '@mui/joy';
import axios from 'axios';
import bg from '../assets/utils/bg.png'
import MyButton from '../components/MyButton'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getJobList } from "../store/reducers/jobSlice"
import Loader from '../components/Loader'
import usePagination from '../hooks/usePagination';
import { createCandidate } from '../store/reducers/candidateSlice';
import { error } from '../store/reducers/notificationSlice';
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
    const { auth, member } = useSelector(state => state.user)


    // const 
    const [openModal, setOpenModal] = useState(false)

    const [page, setPage] = useState(1)
    const jobPerPage = 4;


    const count = Math.ceil(jobs.length / jobPerPage)
    const data = usePagination(jobs, jobPerPage)
    const [jobList, setJobList] = useState(data.currentData())
    const [filter, setFilter] = useState(initFilter)
    const [pdfURL, setPdfURL] = useState("")


    const handleChange = (e, p) => {

        setPage(p);
        data.jump(p);
        // setJobList(data.currentData())
    };


    useEffect(() => {
        setJobList(jobs)
    }, [jobs])

    function handleClickApply() {
        setOpenModal(true)
    }

    const handleChangeSubmitCV = async (files) => {
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
        }
        // alert(selectedFile)
    }
    const handleSubmitJob = (id) => {
        // member: params.member,
        // my_resume_url: params.my_resume_url,
        // job_id: params.job_id,
        const job_id = id;
        const my_resume_url = pdfURL ? pdfURL : null
        if (!member.current_resume_url && !pdfURL) {
            dispatch(error('You need to provide your CV profile first'));
        }
        if (!member.phone) {
            dispatch(error('You need to provide your phone first'))
        }
        // alert(my_resume_url);
        dispatch(createCandidate({ member, job_id, my_resume_url }))
        // alert(id)
        // alert(id)
        // console.log(id);
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
                                        auth={auth}
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
                                        openModal={openModal}
                                        onClose={() => setOpenModal(false)}
                                        handleChangeInputCV={handleChangeSubmitCV}
                                        handleSubmitJob={handleSubmitJob}
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

        </>
    )
}

export default Job