import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col, Table, ListGroup} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/loader.component'
import Message from '../../components/message/message.component'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { USER_LOGOUT, USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { listMyOrders } from '../../actions/orderActions'


function ProfileScreen() {
    const [showResetPassword, setShowResetPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error: errorUpdatePassword } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error: errorOrders, orders } = orderListMy
    // If user is not already logged in, return user to previous page
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } 
        if (!user || !user.username || success ) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
            setPassword('')
            setPassword2('')
            setOldPassword('')
            setShowResetPassword(false)
        }
        if (error === 'Given token not valid for any token type' || errorUpdatePassword === 'Given token not valid for any token type' ) {
            dispatch({type: USER_LOGOUT})
        } 
   

    }, [navigate, userInfo, dispatch, user, success, error, errorUpdatePassword]
    )

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'old_password': oldPassword,
                'password': password,
                'password2': password2
            }))
            setMessage('')
        }

    }


    return (
        <Row>
            <Col>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {errorUpdatePassword && <Message variant='danger'>{errorUpdatePassword}</Message>}
                {success && <Message variant='success'>Password updated</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='flex gap'>
                            <span><strong>Username:</strong>{user && user.username}</span>
                            <span className='left'><strong>Email:</strong>{user && user.email}</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button onClick={()=>setShowResetPassword(!showResetPassword)}>Reset Password</Button>
                        </ListGroup.Item>
                    </ListGroup>

                {showResetPassword &&
                <ListGroup variant='flush'>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='oldpassword'>
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                required
                                type='password'
                                placeholder='Please enter your old password'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId='password2'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type='password'
                                placeholder='Confirm Password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form> 
                </ListGroup>
}
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                    {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn=sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                    ))}
                        </tbody>
                    </Table>
                )}
            </Col>  
        </Row>
    )
}

export default ProfileScreen
