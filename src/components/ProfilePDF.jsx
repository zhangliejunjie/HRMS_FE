import React from 'react'
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Input } from '@mui/material';

const ProfilePDF = () => {
    const handleChange = (files) => {
        console.log(files);
    }
    return (
        <div>
            <h1>sadas</h1>
            <Input
                // ref={inputFileRef}
                accept="application/pdf"
                hidden
                id="cv-pdf-upload"
                type="file"
                onChange={(event) => handleChange(event.target.files)}
            />
        </div>
    )
}

export default ProfilePDF