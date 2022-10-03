import React, { useState } from 'react'
import { CloudinaryImage } from "@cloudinary/url-gen";
import { Box, Input } from '@mui/material';

import PDFView from './PDFView';
const ProfilePDF = () => {
    const [pdf, setPdf] = useState(null)
    const handleChange = (files) => {
        const selectedFile = files[0]
        if (selectedFile) {
            let reader = new FileReader()
            reader.readAsDataURL(selectedFile)
            reader.onload = (e) => {
                setPdf(e.target.result)
            }
        }
    }
    return (
        <Box mt={3} sx={{ width: '100%' }}>
            {
                !pdf && <h2>Hiện tại bạn chưa có CV, vui lòng bổ sung CV để ứng tuyển</h2>
            }

            <Input

                // ref={inputFileRef}
                accept="application/pdf"

                hidden
                id="cv-pdf-upload"
                type="file"
                onChange={(event) => handleChange(event.target.files)}
            />
            <PDFView pdf={pdf} />
        </Box>
    )
}

export default ProfilePDF