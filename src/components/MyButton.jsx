import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'



const MyButton = ({ content, sx, size, bgColor = '#45CE7C', ...rest }) => {


    return (
        <Button
            // onClick={(e) => e.preventDefault()}
            size={size}
            sx={{ textTransform: 'none', bgcolor: bgColor, ...sx }}
            {...rest}
        >
            {content}
        </Button>
    )
}

MyButton.propTypes = {
    content: PropTypes.node.isRequired,
    sx: PropTypes.object,
    bgColor: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['small', 'medium', 'large']),
        PropTypes.string
    ]),
}
MyButton.defaultProps = {
    size: 'medium'
}
export default MyButton