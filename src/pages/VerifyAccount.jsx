import { InputAdornment } from '@mui/material'
import React from 'react'
import bg from '../assets/utils/bg.png'
import TextInput from '../components/TextInput'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { errorHelper } from '../utils/tool';
import MyButton from '../components/MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAccount } from '../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { error } from '../store/reducers/notificationSlice';


export default function () {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.member)
    const formik = useFormik({
        initialValues: {
            email: user.email,
            verified_code: '',
        },
        validationSchema: Yup.object().shape({
            verified_code: Yup.string()
                .required()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(4, 'Must be exactly 4 digits')
                .max(4, 'Must be exactly 4 digits')

        }),
        onSubmit: (values) => {
            // alert(JSON.stringify(formik.values))
            const { verified_code, email } = values;
            console.log(values)

            dispatch(verifyAccount({ verified_code, email }))
            // .then(nav('/auth'))

        }
    })
    return (
        <div className='access' style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className='verified_code-form'>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <div className='access__right__form'>
                        <h1>Nhập code xác thực</h1>

                        <TextInput
                            name='verified_code'
                            placeholder='verified_code has 4 digits'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon style={{ color: '#111111' }} />
                                    </InputAdornment>
                                )
                            }}

                            {...formik.getFieldProps('verified_code')}
                            {...errorHelper(formik, 'verified_code')}
                            onChange={formik.handleChange}
                            value={formik.values.verified_code}
                            color="success"
                        />
                        <TextInput
                            name='email'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon style={{ color: '#111111' }} />
                                    </InputAdornment>
                                )
                            }}

                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}
                            disabled
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            color="success"
                        />
                        <MyButton
                            type='submit'
                            content="Gửi"
                            size='large' bgColor='#FBC115'
                            sx={{
                                color: '#ffffff',
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: '#45CE7C'
                                },
                            }}


                        />
                        {user.status === "Active" && <p style={{
                            textAlign: 'left',
                            paddingBottom: '3rem'
                        }}>
                            Về trang
                            <span style={{
                                color: '#FBC115',
                                cursor: 'pointer',
                            }} onClick={() => nav('/auth')}> đăng nhập</span>
                        </p>}
                    </div>

                </form>
            </div>
        </div>
    )
}
