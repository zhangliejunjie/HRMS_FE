import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
const MyButton = ({ content, sx, size, ...rest }) => {
    return (
        <Button size={size} sx={{ ...sx, textTransform: 'none' }} {...rest}>
            {content}
        </Button>
    )
}

MyButton.propTypes = {
    content: PropTypes.node.isRequired,
    sx: PropTypes.object,
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['small', 'medium', 'large']),
        PropTypes.string
    ]),

}
MyButton.defaultProps = {
    size: 'medium'
}
export default MyButton