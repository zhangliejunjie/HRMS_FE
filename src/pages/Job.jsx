import React, { useState } from 'react'
import JobCard from '../components/JobCard'
import { Pagination, Typography } from '@mui/material'
import bg from '../assets/utils/bg.png'
import MyButton from '../components/MyButton'
const jobList = [
    {
        id: 'j01',
        name: '.NET Software Architect',
        salary: '1.000$',
        quantity: 1,
        start_date: new Date(2022, 10),
        end_date: new Date(2022, 11),
        team: 'Engineering',
        type: 'Experienced',
        isRemote: true,
    },
    {
        id: 'j02',
        name: 'Senior Regional Business Development Manager',
        salary: '1.000$',
        quantity: 2,
        start_date: new Date(2022, 10),
        end_date: new Date(2022, 11),
        team: 'Business Deveplopment',
        type: 'Experienced',
        isRemote: false,
    },
    {
        id: 'j03',
        name: 'Digital Content Intern.',
        salary: '1.000$',
        quantity: 4,
        start_date: new Date(2022, 10),
        end_date: new Date(2022, 11),
        team: 'Business Deveplopment',
        type: 'Intern',
        isRemote: false,
    },
    {
        id: 'j04',
        name: 'Software Test Engineer Intern (QA/QC/Tester)',
        salary: '1.000$',
        quantity: 1,
        start_date: new Date(2022, 10),
        end_date: new Date(2022, 11),
        team: 'Engineering',
        type: 'Intern',
        isRemote: true,
    },
    {
        id: 'j05',
        name: 'Technical Writer.',
        salary: '1.000$',
        quantity: 1,
        start_date: new Date(2022, 10),
        end_date: new Date(2022, 11),
        team: 'Product Manager',
        type: 'Experienced',
        isRemote: false,
    },
    {
        id: 'j06',
        name: 'IT Helpdesk Engineer.',
        // salary: null,
        quantity: 8,
        start_date: new Date(2022, 10),
        end_date: new Date(2022, 11),
        team: 'Engineering',
        type: 'Experienced',
        isRemote: false,
    }

]

const Job = () => {

    const initFilter = {
        type: [],
        team: [],
    }


    const [job, setJob] = useState(jobList)
    const [filter, setFilter] = useState(initFilter)

    return (
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
                            jobList.map((job) => (
                                <JobCard
                                    id={job.id}
                                    key={job.id}
                                    name={job.name}
                                    quantiy={job.quantity}
                                    salary={job.salary}
                                    start_date={job.start_date}
                                    end_date={job.end_date}
                                    team={job.team}
                                    type={job.type}
                                    isRemote={job.isRemote}
                                />
                            ))
                        }
                    </div>
                    <Pagination page={1} />
                </div>
            </div>
        </div>
    )
}

export default Job