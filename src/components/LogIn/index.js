import React, { useRef, useState } from 'react';
import { Button, Card, Form, Alert, Row, Col } from 'react-bootstrap';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import { Link, useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const { handleLogin } = useAuthContext();

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const onHandleSubmit = async(e) => {
        e.preventDefault();
        try {
                setError('');
                setLoading(true); 
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                await handleLogin(email,password);
                history.push('/home');
        }
        catch {
            setError('Failed to login account. Please try again!')
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='email' className="mb-3" as={Row}>
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control type='email' ref={emailRef} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group id='password' className="mb-3" as={Row}>
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control type='password' ref={passwordRef} required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-3' type='submit'>Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-3 mb-1'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                    Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}

export default Login;
