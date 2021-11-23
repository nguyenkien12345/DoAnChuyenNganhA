import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';

function ForgotPassword() {

    const emailRef = useRef();

    const { resetPassword } = useAuthContext();

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');

    const onHandleSubmit = async(e) => {
        e.preventDefault();
        try {
                setError('');
                setMessage('');
                setLoading(true); 
                const email = emailRef.current.value;
                await resetPassword(email);
                setMessage('Check your inbox for futher instructions')
        }
        catch {
            setError('Failed to reset password. Please try again!')
        }
        setLoading(false);
    }

    return (
        <>
            <Card className="bg-light p-2">
                <Card.Img className="my-3" variant="top" src="https://5f0bcb9ec8360803c18a-ba88e5c92710a8d62fc2e3a3b5f53bbb.ssl.cf2.rackcdn.com/images/satellite/forgotten_login.png" height="250px"/>
                <Card.Body>
                    <Card.Title className='text-center alert alert-dark fw-bolder mb-4 fs-3'>Reset Password</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='email' as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control type='email' ref={emailRef} required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} variant="success" className='w-100 mt-3 fs-5 fw-bold' type='submit'>Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-3 mb-1 fs-5'>
                        <Link to='/login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-3 fs-5'>
                Need an account?&nbsp; 
                <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;
