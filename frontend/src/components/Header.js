import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { useNavigate } from 'react-router-dom'


function Header() {
    let navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const dispatch = useDispatch() 

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header>

            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Fish N Stik</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox  />
                        <Nav className="mr-auto">

                            <Container className='flex width wrap'>
                            <NavDropdown title='Our products'>
                                <LinkContainer to='/?keyword=hooks'>
                                    <NavDropdown.Item>
                                        Hooks
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/?keyword=snaps'>
                                    <NavDropdown.Item>
                                        Snaps
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/?keyword=swivels'>
                                    <NavDropdown.Item>
                                        Swivels
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/?keyword=fishingline'>
                                    <NavDropdown.Item>
                                        Fishing Line
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>

                        {userInfo ? (
                            <NavDropdown title='Welcome!' id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                </NavDropdown.Item>
                                
                            </NavDropdown>
                        ): (
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-userf"></i>Login</Nav.Link>
                            </LinkContainer>
                        )
                    }   



                            <LinkContainer to='/cart' className='left'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>

                            </Container>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
