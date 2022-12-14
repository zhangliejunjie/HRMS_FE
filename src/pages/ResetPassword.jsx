import { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import MyButton from "../components/MyButton";
import TextInput from "../components/TextInput";
import { InputAdornment } from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { errorHelper } from "../utils/tool";
import bg from '../assets/utils/bg.png'
import { useDispatch } from "react-redux";
import { success, error } from "../store/reducers/notificationSlice";


const ResetPassword = () => {

    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate()
    const param = useParams();
    const dispatch = useDispatch();
    const url = `http://localhost:8000/api/member-auth/reset-password/${param.id}/${param.start}`;
    // const dispatch = useDispatch()
    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        };
        verifyUrl();
    }, [param, url]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.post(url, { password });
    //         setMsg(data.message);
    //         setError("");
    //         nav("/auth");
    //     } catch (error) {
    //         if (
    //             error.response &&
    //             error.response.status >= 400 &&
    //             error.response.status <= 500
    //         ) {
    //             setError(error.response.data.message);
    //             setMsg("");
    //         }
    //     }
    // };
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().min(6, 'M???t kh???u ph???i nhi???u h??n 6 k?? t???.').max(200, 'M???t kh???u ph???i ??t h??n 200 k?? t???').required('M???t kh???u kh??ng ???????c b??? tr???ng'),
            confirmPassword: Yup.string().min(6, 'M???t kh???u ph???i nhi???u h??n 6 k?? t???.').max(200, 'M???t kh???u ph???i ??t h??n 200 k?? t???').required().oneOf([Yup.ref('password'), null], "M???t kh???u x??c nh???n ph???i tr??ng kh???p"),
        }),
        onSubmit: async (values) => {
            // console.log(values);
            // alert(JSON.stringify(formik.values))
            const { password } = values;
            console.log(password);

            try {
                const { data } = await axios.post(url, { password });
                setMsg(data.message);
                setError("");
                dispatch(success("Thay ?????i password th??nh c??ng"))
                setTimeout(() => {
                    nav("/auth");
                }, 3000);

            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                    setMsg("");
                    dispatch(error("Thay ?????i password th???t b???i"))

                }
            }
        }
    })

    return (
        <div className='access' style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>

            {validUrl ? (
                <div className="reset-form">
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>

                        <div className="access__right__form">
                            <h1>Nh???p m???t kh???u m???i</h1>
                            {/* <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className={styles.input}
                        /> */}
                            <TextInput
                                placeholder='example@123'
                                type='password'
                                name='password'

                                color="success"


                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon style={{ color: '#111111' }} />
                                        </InputAdornment>
                                    )
                                }}
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <TextInput
                                placeholder='example@123'
                                type='password'
                                name='confirmPassword'

                                color="success"


                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon style={{ color: '#111111' }} />
                                        </InputAdornment>
                                    )
                                }}
                                {...formik.getFieldProps('confirmPassword')}
                                {...errorHelper(formik, 'confirmPassword')}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />

                            {error && <div className={styles.error_msg}>{error}</div>}
                            <MyButton
                                type='submit'
                                content="G???i"
                                size='large' bgColor='#FBC115'
                                sx={{
                                    color: '#ffffff',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor: '#45CE7C'
                                    },
                                }}


                            />
                        </div>

                    </form>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </div>

    );
};

export default ResetPassword;