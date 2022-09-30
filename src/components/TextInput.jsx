import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { OutlinedInput, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const CustomInput = styled(OutlinedInput)(({ theme }) => ({
    width: 380,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.MuiOutlinedInput-root': {
        borderRadius: `10px;`,
        backgroundColor: '#ffffff',
    },
    '&.Mui-focused': {
        // width: 420,
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',


    },
    '& fieldset': {
        padding: '0',
        borderWidth: `2px !important`,
        border: `double 1em transparent`,
        borderRadius: `10px;`,
        borderTop: '1',
        borderRight: '1',
        borderLeft: '1',
        borderImageSlice: 3,
        borderImageSource: `linear-gradient(to left, #00C853, #B2FF59);`,
        // 

        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box'
        // borderColor: `${theme.palette.grey[500_32]} !important`,

        //,

    },
    '&.Mui-disabled': {
        backgroundColor: '#DFDFDE',
        color: 'black'
    },
    '& fieldset:hover': {
        // backgroundColor: 'red',
        borderTop: '2',
        borderRight: '2',
        borderLeft: '2',
        // border: 'none'
    }
}));

const TextInput = ({ sx, value, onChange, startAdornment = null, ...rest }) => {
    return (
        <CustomInput
            value={value}
            onChange={onChange}
            startAdornment={startAdornment}
            sx={sx}
            {...rest}
        />
    )
}

TextInput.propTypes = {
    sx: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    startAdornment: PropTypes.object
}

export default TextInput