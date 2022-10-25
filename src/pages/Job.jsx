import React, { useState, useEffect, useCallback } from 'react'
import JobCard from '../components/JobCard'
import { Pagination, Stack, Button, Box, TextField } from '@mui/material'
import { Modal, ModalClose, Typography, ModalDialog } from '@mui/joy';
import axios from 'axios';
import bg from '../assets/utils/bg.png'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import CheckBox from '../components/CheckBox';
import MyButton from '../components/MyButton'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getJobList } from "../store/reducers/jobSlice"
import Loader from '../components/Loader'
import usePagination from '../hooks/usePagination';
import { createCandidate, getAllCandidate } from '../store/reducers/candidateSlice';
import { error, success } from '../store/reducers/notificationSlice';

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
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const jobExperienced = [
    {
        id: 'experienced',
        name: 'Experienced'
    },
    {
        id: 'fresher',
        name: 'Fresher'
    },
    {
        id: 'intern',
        name: 'Intern'
    }
]


const Job = () => {

    const initFilter = {
        category: [],
        experience: []
    }

    const dispatch = useDispatch()
    const nav = useNavigate()

    const { jobs } = useSelector(state => state.job)
    const { auth, member } = useSelector(state => state.user)
    const { categories } = useSelector(state => state.category)

    // const 


    const [page, setPage] = useState(1)
    const jobPerPage = 4;


    const count = Math.ceil(jobs.length / jobPerPage)

    const [jobList, setJobList] = useState(jobs)
    const [filter, setFilter] = useState(initFilter)
    const [pdfURL, setPdfURL] = useState("")
    const [filterTrigger, setFilterTrigger] = useState(false)
    const [textSearch, setTextSearch] = useState("")
    let data = usePagination(jobList, jobPerPage)
    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "category":
                    setFilter({ ...filter, category: [...filter.category, item] })
                    // console.log({ ...filter, category: [...filter.category, item] });
                    break
                case "experience":
                    setFilter({ ...filter, experience: [...filter.experience, item] })
                    break
            }
        } else {
            switch (type) {
                case "category":
                    const newCategory = filter.category.filter(e => e !== item)
                    setFilter({ ...filter, category: newCategory })
                    // console.log({ ...filter, category: newCategory });
                    break
                case "experience":
                    const newExperience = filter.experience.filter(e => e !== item)
                    setFilter({ ...filter, experience: newExperience })
                    break
            }
        }
    }

    const clearFilter = () => {
        setFilter(initFilter)
    }
    const updateJob = useCallback(() => {
        let temp = jobs;
        if (filter.category.length > 0) {
            temp = temp.filter(e => filter.category.includes(e.category))
        }
        if (filter.experience.length > 0) {
            console.log(temp);
            temp = temp.filter(
                (e) => filter.experience?.includes(e.experience)
            )
        }

        setJobList(temp)
        setFilterTrigger(true)
    }, [filter])

    const handleChange = (e, p) => {

        setPage(p);
        data.jump(p);

    };

    useEffect(() => {
        updateJob()

    }, [filter])

    useEffect(() => {
        dispatch(getJobList());
    }, [])

    useEffect(() => {
        const { id } = member
        // log

        dispatch(getAllCandidate({ id }))
    }, [dispatch])

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
    const handleChangeSearch = (e) => {
        setTextSearch(String(e.target.value).toLowerCase())
        let temp = jobList.filter((job) => job.name.toLowerCase().includes(textSearch))
        setJobList(temp)
    }
    return (
        <>
            <div className="job">
                <div className="job-search" style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <TextField id="outlined-basic"
                        variant="outlined"
                        onChange={handleChangeSearch}
                        label="Search"
                        sx={{
                            background: '#ffffff',
                            width: '80%',
                            borderRadius: '10px',
                            // margin: '1rem 0 0 1rem'
                            marginTop: '2rem'
                        }} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                    </TextField>

                </div>
                <div className='job-container'
                    style={{
                        // backgroundImage: `url(${bg})`
                        marginTop: '0rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                >
                    <div className="job-container__left" style={{ height: '100%' }}>
                        <Stack spacing={3}>
                            <h1>Job  Openings</h1>
                            <Typography variant='h4'>Let's find a suitable position to start your
                                Fresher journey with FCode!
                            </Typography>
                            <Box>
                                <Stack className='catalog' spacing={2}>
                                    <Stack className='catalog__filter' spacing={1}>
                                        <div className="catalog__filter__close">
                                            <i className="bx bx-left-arrow-alt"></i>
                                        </div>
                                        <div className="catalog__filter__widget">
                                            <div className="catalog__filter__widget__title">

                                                <Typography variant='h2' component='h2'>Category list</Typography>
                                            </div>
                                            <Box className="catalog__filter__widget__content" mt={2}>
                                                <Typography variant='h3' component='h3'>Job type:</Typography>
                                                {
                                                    categories.map((category) => (
                                                        <div>
                                                            <CheckBox
                                                                label={category.name}
                                                                onChange={(input) => {
                                                                    console.log(input.checked);
                                                                    filterSelect("category", input.checked, category.name)
                                                                }}
                                                                checked={filter.category.includes(category.name)}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </Box>
                                        </div>
                                        <div className="catalog__filter__widget" mt={3}>

                                            <Box className="catalog__filter__widget__content" mt={2}>
                                                <Typography variant='h3' component='h3'>Job Experienced:</Typography>

                                                {
                                                    jobExperienced.map((job) => (
                                                        <div>
                                                            <CheckBox label={job.name}
                                                                onChange={(input) => {
                                                                    console.log(input.checked);
                                                                    filterSelect("experience", input.checked, job.name)
                                                                }}
                                                                checked={filter.experience.includes(job.name)}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </Box>
                                        </div>
                                    </Stack>
                                </Stack>

                            </Box>
                        </Stack>
                        {/* <MyButton content={"Tìm việc"} /> */}
                    </div>
                    <div className="job-container__right">
                        <Typography textAlign={'start'} variant='h4' component='h4' mb={1}>Total: {jobList.length}</Typography>
                        <div className="job-container__right__job-card">
                            {
                                jobList ? data.currentData().slice().sort((a, b) => (a.name > b.name) ? 1 : -1).map((job, index) => (
                                    <JobCard
                                        auth={auth}
                                        id={job.id}
                                        key={index}
                                        name={job.name}
                                        quantiy={job.quantity}
                                        salary={job.salary}
                                        start_date={job.start_date}
                                        // end_date={job.end_date}
                                        team={job.category}
                                        type={job.experience}
                                        isRemote={job.isRemote}
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