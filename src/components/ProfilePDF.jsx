import React, { useState } from 'react'
import { Box, Input, Button, Stack } from '@mui/material';

import PDFView from './PDFView';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { update } from '../store/reducers/userSlice';
import { success } from '../store/reducers/notificationSlice';
const ProfilePDF = ({ member, token }) => {
    const dispatch = useDispatch()
    // const [pdf, setPdf] = useState(null)
    const [pdfURL, setPdfURL] = useState("")
    const handleChange = (files) => {
        const selectedFile = files[0]


        if (selectedFile) {
            let reader = new FileReader()

            reader.readAsDataURL(selectedFile)
            reader.onload = (e) => {
                // setPdf(e.target.result)
            }

            const formData = new FormData()
            formData.append("file", selectedFile)
            formData.append("upload_preset", "hrms_client")


            axios.post("https://api.cloudinary.com/v1_1/sangtran127/image/upload", formData).then((res) => {

                console.log(res.data.url);
                setPdfURL(res.data.url);
                console.log(pdfURL);
            }).catch((err) => console.log(err))
        }
    }
    const handleSubmitPDF = () => {
        const params = {
            data: {
                current_resume_url: pdfURL
            },
            token
        }
        dispatch(update(params)).then(() => {
            dispatch(success("Upload CV thành công"))
        }).catch(err => console.log(err))
    }
    console.log(member);
    return (
        <Box mt={3} sx={{ width: '100%' }}>
            {
                !member.current_resume_url && <h2>Hiện tại bạn chưa có CV, vui lòng bổ sung CV để ứng tuyển</h2>
            }
            <PDFView pdf={member.current_resume_url} />
            <Stack direction="row" gap={4}>
                <input
                    // ref={inputFileRef}
                    style={{
                        display: 'block'
                    }}
                    accept="application/pdf"
                    hidden
                    id="cv-pdf-upload"
                    type="file"
                    onChange={(event) => handleChange(event.target.files)}
                />

                <Button onClick={handleSubmitPDF}>Nộp CV</Button>
            </Stack>
        </Box>
    )
}

export default ProfilePDF