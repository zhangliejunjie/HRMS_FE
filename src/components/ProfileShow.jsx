import React, { useState, useRef, createRef } from 'react'


// mui
import { Button, Box, Avatar, ListItemText, ListItemButton, Typography, AppBar, Tabs, Tab, Container, Stack, TextField } from '@mui/material'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../store/reducers/userSlice';
import axios from 'axios'
//icon

import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MyButton from './MyButton';

//component
import TextInput from './TextInput';
import ProfilePDF from './ProfilePDF';
//form
import { useFormik } from 'formik';

import * as Yup from 'yup'
// Họ và tên
// Email
// Số điện thoại 
// Địa chỉ
const ProfileShow = () => {
    const { member, token } = useSelector(state => state.user)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    // cons
    const formik = useFormik({
        initialValues: {
            fullname: member.fullname,
            email: member.email,
            phone: '0399716348',
            address: 'Phước Long A, phường Long Thạnh Mỹ, Q9, TPHCM',
            avatar: member.avatar
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().min(6, 'Họ và tên người dùng phải dài hơn 6 kí tự.').required('Họ và tên không được bỏ trống'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
        }),
        onSubmit: (values) => {
            const { fullname, email } = values

            const params = {
                data: {
                    fullname,
                    email,
                    avatar: image
                },
                token: token
            }

            dispatch(update(params)).then(
                alert('Update thanh cong')
            )


        }
    })
    const [image, setImage] = useState(undefined);
    const inputFileRef = createRef(null);
    const [disabledInput, setDisableInput] = useState(true)
    const handleOnChange = (files) => {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "hrms_client")
        axios.post("https://api.cloudinary.com/v1_1/sangtran127/image/upload", formData).then((res) => {
            checkImg(res.data.url)
            // console.log(res.data.url);
        })
    }
    const cleanup = () => {
        inputFileRef.current.value = null;
    };
    const checkImg = (newImage) => {
        if (image) {
            cleanup()
        }
        setImage(newImage)
    }
    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
        }

    }
    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='1400px' margin='0 auto' height='100%'>
            <Box>
                <Typography component='h1' variant='h4'>
                    Thông tin cá nhân
                </Typography>
                <Box display='flex' gap={2} mt={5}>
                    <Box className='left'>
                        <Avatar
                            sx={{
                                width: '425px',
                                height: '425px',
                                borderRadius: '10px'
                            }}
                            alt={member.fullname}
                            src={!image ? member.avatar : image}
                            variant='square'
                            imgProps={{
                                style: {
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "cover",
                                },
                            }}
                        />
                        <input
                            ref={inputFileRef}
                            accept="image/*"
                            hidden
                            id="avatar-image-upload"
                            type="file"
                            onChange={(event) => handleOnChange(event.target.files)}
                        />
                        <label htmlFor="avatar-image-upload">
                            <MyButton
                                variant="contained"
                                color="primary"
                                component="span"
                                mb={2}
                                onClick={handleClick}
                                sx={{
                                    color: 'white', borderRadius: '10px', padding: '1 2rem',
                                    '&:hover': {
                                        backgroundColor: '#FBC115'
                                    }
                                }}
                                content={image ? <DeleteIcon mr={2} /> : <CloudUploadIcon mr={2} />}
                            >
                                {image ? "Delete" : "Upload"}

                            </MyButton>
                        </label>
                    </Box>
                    <Box className='right'>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack>
                                <Typography>Họ và tên:</Typography>
                                <TextInput name="fullname"
                                    disabled={disabledInput} onChange={formik.handleChange} value={formik.values.fullname}
                                />
                            </Stack>
                            <Stack mt={2}>
                                <Typography>Email:</Typography>
                                <TextInput name="email" disabled={disabledInput} onChange={formik.handleChange} value={formik.values.email} />
                            </Stack>
                            <Stack mt={2}>
                                <Typography>Số điện thoại:</Typography>
                                <TextInput name="phone" disabled={disabledInput} onChange={formik.handleChange} value={formik.values.phone} />
                            </Stack>
                            <Stack mt={2}>
                                <Typography>Địa chỉ:</Typography>
                                <TextInput name="address" disabled={disabledInput} multiline onChange={formik.handleChange} value={formik.values.address} />
                            </Stack>
                            <Stack direction="row" justifyContent='space-between' mt={2} >
                                <MyButton
                                    content={disabledInput ? 'Chỉnh sửa thông tin' : 'Huỷ bỏ'}
                                    size='large' bgColor='#FBC115'
                                    sx={{
                                        color: '#ffffff',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            backgroundColor: `${disabledInput ? '#45CE7C' : '#F32424'}`
                                        }
                                    }}
                                    onClick={() => setDisableInput(!disabledInput)}
                                />

                                {
                                    !disabledInput && <MyButton type="submit" content='Xác nhận' size='large'
                                        sx={{
                                            color: 'white', borderRadius: '10px', padding: '1 2rem',
                                            '&:hover': {
                                                backgroundColor: '#125C13'
                                            }
                                        }}
                                    />
                                }

                            </Stack>
                        </form>

                        <ProfilePDF />
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default ProfileShow