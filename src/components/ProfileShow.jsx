import React, { useState, useRef, createRef } from 'react'


// mui
import { Button, Box, Avatar, Divider, ListItemButton, Typography, AppBar, Tabs, Tab, Container, Stack, TextField } from '@mui/material'

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
import { errorHelper } from '../utils/tool';
//form
import { useFormik } from 'formik';

import * as Yup from 'yup'
import { success } from '../store/reducers/notificationSlice';
// Họ và tên
// Email
// Số điện thoại 
// Địa chỉ
const ProfileShow = () => {
    const { member, token } = useSelector(state => state.user)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const [image, setImage] = useState(undefined);
    const inputFileRef = createRef(null);
    const [disabledInput, setDisableInput] = useState(true)
    // cons
    const formik = useFormik({
        initialValues: {
            fullname: member.fullname,
            email: member.email,
            // phone: member.phone,
            address: member.address ? member.address : "Trống",
            phone: member.phone ? member.phone : "Trống"
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().min(6, 'Họ và tên người dùng phải dài hơn 6 kí tự.').required('Họ và tên không được bỏ trống'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
            address: Yup.string(),
            phone: Yup.string().min(10).max(13)
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

            dispatch(update(params))
                .then(() => {
                    dispatch(success('Update thành công'));
                    setDisableInput(true)
                })


        }
    })

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
            <Stack gap={3}>
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
                                accept="image/png, image/jpg, image/jpeg, image/gif"
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
                                        disabled={disabledInput}
                                        {...formik.getFieldProps('fullname')}
                                        {...errorHelper(formik, 'fullname')}
                                    />
                                </Stack>
                                <Stack mt={2}>
                                    <Typography>Email:</Typography>
                                    <TextInput name="email" disabled={disabledInput}
                                        {...formik.getFieldProps('email')}
                                        {...errorHelper(formik, 'email')}
                                    />
                                </Stack>
                                <Stack mt={2}>
                                    <Typography>Số điện thoại:</Typography>
                                    <TextInput name="phone" disabled={disabledInput}
                                        {...formik.getFieldProps('phone')}
                                        {...errorHelper(formik, 'phone')}
                                    />
                                </Stack>
                                <Stack mt={2}>
                                    <Typography>Địa chỉ:</Typography>
                                    <TextInput name="address" disabled={disabledInput} multiline
                                        {...formik.getFieldProps('address')}
                                        {...errorHelper(formik, 'address')}
                                    />
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
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box>
                    <Typography component='h1' variant='h4'>
                        Thông tin CV
                    </Typography>
                    <ProfilePDF member={member} token={token} />
                </Box>
            </Stack>
        </Box >
    )
}

export default ProfileShow