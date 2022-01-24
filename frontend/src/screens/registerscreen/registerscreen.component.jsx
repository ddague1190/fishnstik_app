import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader.component';
import Message from '../../components/message/message.component';
import FormContainer from '../../components/formcontainer/formcontainer.component';
import { register, sendOTP } from '../../actions/userActions';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../utils/useForm';
import './registerscreen.styles.scss';

const RegisterScreen = () => {

    const [formData, setFormData] = useForm({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        OTP: ''
    });

    const [message, setMessage] = useState('');

    const {userName, email, password, confirmPassword, OTP} = formData;

    const dispatch = useDispatch();

    let navigate = useNavigate();

    let redirect = useLocation().search.split('=')[1];
    
    if(!redirect) redirect='/';

    const userRegister = useSelector(state => state.userRegister);

    const {error, loading, OTPready, userInfo} = userRegister;

    // If user is already logged in, return user to previous page
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect, error]
    );

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(userName, email, password))
            setMessage('')
        }
    };

    const submitOTP = (e) => {
        e.preventDefault()
        dispatch(sendOTP(OTP, userName, password))
    };

    return (

        <div className='registerscreen'>

        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}

 {!OTPready ? (

    <form className='registrationform' onSubmit={submitHandler}>

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='username'
                required
                name='userName'
                placeholder='Please pick a username'
                value={userName}
                onChange={setFormData}
            />
            <label for='username' class='input-control__label'>
                Username
            </label>
        </div>

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='email'
                required
                type='email'
                name='email'
                placeholder='Your email address'
                value={email}
                onChange={setFormData}
            />
            <label for='email' class='input-control__label'>
                Email
            </label>
        </div>

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='password'
                required
                type='password'
                name='password'
                placeholder='Enter password'
                value={formData.password}
                onChange={setFormData}
            />
            <label for='password' class='input-control__label'>
                Password
            </label>
        </div>

        <div class='input-control'>
            <input 
                class='input-control__input'
                id='passwordconfirm'
                required
                type='password'
                name='confirmPassword'
                placeholder='Please confirm your password'
                value={formData.confirmPassword}
                onChange={setFormData}
            />
            <label for='passwordconfirm' class='input-control__label'>
                Confirm Password
            </label>
        </div>


        <button className='btn--main' type='submit' variant='primary'>
                    Register
        </button>

        <div className='registrationform__alreadyhaveaccount'>
            Already have an Account?
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Sign In</Link>
        </div>
    </form>


    
) :
(
        <div className='registerscreen__validateemail' >
            <h1>Validate Email</h1>
            <form onSubmit={submitOTP}>

                <div class='input-control'>
                    <input 
                        class='input-control__input'
                        id='OTP'
                        required
                        type='name'
                        name='OTP'
                        placeholder='OTP from your email'
                        value={formData.OTP}
                        onChange={setFormData}
                    />
                    <label for='OTP' class='input-control__label'>
                        Enter OTP
                    </label>
                </div>
                <button className='btn--main' type='submit' variant='primary'>
                    Submit
                </button>
            </form>
        </div>
    )}
        </div>

    )
};

export default RegisterScreen;
