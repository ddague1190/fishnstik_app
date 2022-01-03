import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'      

function Footer() { 
    return (
        <footer>
            <Container>
                <Row className='flex align light'>
                    <Col className="text-center py-3">Copyright &copy; Fish N Stik</Col>
                    <Col>
                        <a href='/#/aboutus'>About us</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
