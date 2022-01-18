import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/loader.component'
import Message from '../../components/message/message.component'
import FormContainer from '../../components/formcontainer/formcontainer.component'
import { login, loginWithOTP } from '../../actions/userActions'
import { useNavigate, useLocation } from 'react-router-dom'


function LoginScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [needOTP, setNeedOTP] = useState(false)
    const [OTP, setOTP] = useState('')

    const dispatch = useDispatch()

    let navigate = useNavigate()

    let redirect = useLocation().search.split('=')[1]
    if(!redirect) redirect='/'

    const userLogin = useSelector(state => state.userLogin)

    const {error, loading, userInfo} = userLogin


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }

        if(error && error[0].includes('We were not able to verify your email')) {
            setNeedOTP(true)
        }

    }, [navigate, userInfo, redirect, error]
    )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    const submitOTP = (e) => {
        e.preventDefault()
        dispatch(loginWithOTP(OTP, username, password))
    }

    return (
        
        <div>
{error && <Message variant='danger'>{error}</Message>}

{loading && <Loader />}

{!needOTP ? (
        <FormContainer>
            <h1>Sign In</h1>

   
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='Username'
                        placeholder='Your username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    New to our site? 
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>
        </FormContainer>
) :
(
        <FormContainer>
            <h1>Validate Email</h1>
            <br />
            <h5>An OTP was sent to email associated with your account. Please enter it here to complete registration.</h5>
            <br />
    
            <Form onSubmit={submitOTP}>

                <Form.Group controlId='OTP'>
                    <Form.Control
                        required
                        type='name'
                        placeholder='OTP from your email'
                        value={OTP}
                        onChange={(e)=>setOTP(e.target.value)}
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
}

export default LoginScreen
