import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItemButton, ListItemText, Stack } from '@mui/material'
const CollapseList = props => {
    const { options, content } = props;
    const [openCollapse, setOpenCollapse] = useState(false)
    function handleOpen() {
        setOpenCollapse(!openCollapse)
    }
    return (
        <Stack width={'100%'}>
            <Stack direction='row' alignItems='center' textAlign='center' onClick={handleOpen}>
                <ListItemText>{content}</ListItemText>
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
            </Stack>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePaddin>
                    {
                        options.map((option) => (
                            <ListItemButton key={option}>{option}</ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </Stack >
    )
}

CollapseList.propTypes = {
    content: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}

export default CollapseList