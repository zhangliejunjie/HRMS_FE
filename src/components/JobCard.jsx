import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Typography, Chip, Stack, Button } from '@mui/material'
const JobCard = ({ id, name, start_date, end_date, quantiy, salary = 'Deal later', team, type, isRemote, handleClick }) => {
    return (
        <div className='job-card'>
            <h3 className='job-card__title'>{name}</h3>
            <div className="job-card__detail">
                <Typography>  {type}</Typography>
                <Divider orientation="vertical" variant="fullWidth" flexItem />
                <Typography>  {team}</Typography>
                <Divider orientation="vertical" variant="fullWidth" flexItem />

                <Typography> {quantiy}</Typography>
                <Divider orientation="vertical" variant="fullWidth" flexItem />
                <Typography> {salary}</Typography>
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

                <Button onClick={handleClick} color="success" variant='outlined' className="job-card__bottom__apply" sx={{ ml: 'auto' }}>
                    Ứng tuyển ngay
                </Button>

            </Stack>
        </div>
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