import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem, Typography, Box } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const DropdownMenu = ({ content, options, color, sx }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    function handleOpen(event) {
        console.log(event.currentTarget);
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <Box sx={sx}>
            <Button
                endIcon={<KeyboardArrowDownIcon style={{ color: color }} />}
                onClick={handleOpen}

                onMouseOver={handleOpen}
                sx={{ textTransform: 'none' }}
            >
                <p style={{ color: color }}>{content}</p>
            </Button>
            <Menu
                open={open}
                anchorEl={anchorEl}
                MenuListProps={{ onMouseLeave: handleClose }}

            >
                {
                    options.map((option, index) => (
                        <MenuItem key={index}>{option}</MenuItem>
                    ))
                }
            </Menu>
        </Box>
    )
}

DropdownMenu.propTypes = {
    content: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    color: PropTypes.string,
    sx: PropTypes.object,

}
DropdownMenu.defaultProps = {
    color: '#ffffff',

}
export default DropdownMenu