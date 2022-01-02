import React, {useState} from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate();
    let location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(location.pathname)
        }
    }
    return (

    <Col md={6}>
        <Form onSubmit={submitHandler} className='flex mt-2' >
            <Form.Control
                size="sm"
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >
            </Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2 inline'
            >
                Submit
            </Button>
        </Form>
        </Col>

    )
}

export default SearchBox
