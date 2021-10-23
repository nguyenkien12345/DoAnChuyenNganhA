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
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Reset Password</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='email' as={Row}>
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control type='email' ref={emailRef} required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-3' type='submit'>Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-3 mb-1'>
                        <Link to='/login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                    Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;
