import { motion, useIsPresent, useScroll, useSpring } from 'framer-motion'
import React, { useState } from 'react'
import { InputAdornment, InputLabel, Divider, Chip } from '@mui/material'
// import fcode from '../assets/utils/fcode.png'
import PropTypes from 'prop-types'
import computer from '../assets/utils/MacBook.png'
import iphone from '../assets/utils/iPhone.png'
import ipad from '../assets/utils/iPad.png'
import TextInput from '../components/TextInput'
import MyInput from '../components/MyInput'
import bg from '../assets/utils/bg.png'
import MyButton from '../components/MyButton'

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Access = props => {
    // const { scrollYProgress } = useScroll();
    // const scaleX = useSpring(scrollYProgress, {
    //     stiffness: 100,
    //     damping: 30,
    //     restDelta: 0.001
    // });
    const isPresent = useIsPresent();
    const [isLogin, setIsLogin] = useState(true)
    return (
        <>
            <div className='access' style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className='access__left'>
                    <motion.img
                        className='access__left__img'
                        width={400}
                        src={computer} alt={computer}
                    // initial={{
                    //     y: 30
                    // }}
                    // animate={{
                    //     // scale: [1, 2, 2, 1, 1],
                    //     y: -30
                    // }}
                    // exit={{ y: 0 }}
                    // transition={{
                    //     duration: 2,
                    //     repeat: Infinity
                    // }}

                    />
                    <img src={iphone} alt="" width={200} />
                    <img src={ipad} alt="" width={200} />
                </div>
                <div className="access__right">
                    <div className='access__right__form'>
                        <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores vitae suscipit.</p>
                        <MyInput
                            placeholder='example@gmail.com'
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircleIcon style={{ color: '#111111' }} />
                                </InputAdornment>
                            }
                        />
                        <MyInput
                            placeholder='example@123'
                            type='password'

                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon style={{ color: '#111111' }} />
                                </InputAdornment>

                            }
                        />
                        {
                            !isLogin && <MyInput
                                placeholder='example@123'
                                type='password'
                                // label={
                                //     <InputLabel color='error'>asdad</InputLabel>
                                // }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon style={{ color: '#111111' }} />
                                    </InputAdornment>

                                }
                            />
                        }
                        {
                            isLogin && <>
                                <p style={{
                                    textAlign: 'left'
                                }}>
                                    Quên mật khẩu ? Nhấn vào đây để
                                    <span style={{
                                        color: '#FBC115',
                                        cursor: 'pointer'
                                    }}> reset</span>
                                </p>

                                <Divider sx={{ width: '100%' }}>
                                    <Chip label='hoặc' />
                                </Divider>
                            </>
                        }
                        <p style={{
                            textAlign: 'left'
                        }}>
                            {`${isLogin ? 'Chưa' : 'Đã'}`} có tài khoản ? Nhấn vào đây để
                            <span style={{
                                color: '#FBC115',
                                cursor: 'pointer'
                            }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? ' đăng ký' : ' đăng nhập'}</span>
                        </p>
                        <MyButton
                            content={`${isLogin ? 'Đăng nhập' : 'Đăng ký'}`}
                            size='large' bgColor='#FBC115'
                            sx={{
                                color: '#ffffff',
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: '#45CE7C'
                                }
                            }}

                        />
                    </div>
                </div>









            </div>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
                exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
                style={{ originX: isPresent ? 0 : 1 }}
                className="privacy-screen"
            >
            </motion.div>
        </>
    )
}

Access.propTypes = {}

export default Access