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
            <Card className="bg-light p-2">
                <Card.Img className="my-3" variant="top" src="https://images.unsplash.com/photo-1489769002049-ccd828976a6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1661&q=80" height="250px"/>
                <Card.Body>
                    <Card.Title className='text-center alert alert-dark fw-bolder mb-4 fs-3'>Log In</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='email' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control type='email' ref={emailRef} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group id='password' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control type='password' ref={passwordRef} required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} variant="success" className='w-100 mt-3 fs-5 fw-bold' type='submit'>Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-3 mb-1 fs-5'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
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

export default Login;
