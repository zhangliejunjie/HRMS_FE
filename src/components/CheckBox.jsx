import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@mui/material/Checkbox';

const CheckBox = props => {

    const inputRef = useRef(null)
    const onChange = () => {
        if (props.onChange) {

            props.onChange(inputRef.current.children[0])
            // console.log(inputRef);
        }
    }
    return (
        <label className="custom-checkbox">
            <Checkbox ref={inputRef} onChange={onChange} checked={props.checked} color="success" />
            {props.label}
        </label>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default CheckBox