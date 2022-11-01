import { InputAdornment } from '@mui/material'
import React from 'react'
import bg from '../assets/utils/bg.png'
import TextInput from '../components/TextInput'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { errorHelper } from '../utils/tool';
import MyButton from '../components/MyButton';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';


export default function () {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),

        }),
        onSubmit: (values) => {
            console.log(values);
            // alert(JSON.stringify(formik.values))
            const { email } = values;
            dispatch(forgotPassword({ email }))

        }
    })
    return (
        <div className='access' style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className='email-form'>
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <div className='access__right__form'>
                        <h1>Nhập email của bạn</h1>

                        <TextInput
                            name='email'
                            placeholder='example@gmail.com'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon style={{ color: '#111111' }} />
                                    </InputAdornment>
                                )
                            }}

                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}
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
                        <p style={{
                            textAlign: 'left',
                            paddingBottom: '3rem'
                        }}>
                            Về trang
                            <span style={{
                                color: '#FBC115',
                                cursor: 'pointer',
                            }} onClick={() => nav('/auth')}> đăng nhập</span>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}
