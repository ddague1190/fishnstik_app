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

function RegisterScreen() {

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
    }, [navigate, userInfo, redirect]
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

        <div>

        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}

 {!OTPready ? (

     <FormContainer>
            <h1>Register</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        required
                        name='userName'
                        placeholder='Please pick a username'
                        value={formData.userName}
                        onChange={setFormData}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Your email address'
                        value={formData.email}
                        onChange={setFormData}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={formData.password}
                        onChange={setFormData}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Please confirm your password'
                        value={formData.confirmPassword}
                        onChange={setFormData}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already have an Account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
) :
(
        <FormContainer>
            <h1>Validate Email</h1>
            <br />
            <h5>An OTP was sent to your email ({email}) for validation. Please enter it here to complete registration.</h5>
            <br />
    
            <Form onSubmit={submitOTP}>

                <Form.Group controlId='OTP'>
                    <Form.Control
                        required
                        type='name'
                        placeholder='OTP from your email'
                        value={OTP}
                        onChange={setFormData}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Submit
                </Button>
            </Form>

        </FormContainer>
)}
        </div>

       )
};

export default RegisterScreen;
