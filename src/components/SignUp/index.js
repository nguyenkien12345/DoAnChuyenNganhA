import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';

function SignUp() {

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef(); 

    const { handleSignUp } = useAuthContext();

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const onHandleSubmit = async(e) => {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            setError('Password and Confirm password does not match. Please try again!');
            return;
        }
        try {
                setError('');
                setLoading(true);
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                await handleSignUp(email,password);
                history.push('/login');
                
        }
        catch {
            setError('Failed to register an account. Please try again!')
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
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

                        <Form.Group id='confirmPassword' className="mb-3" as={Row}>
                            <Form.Label column sm="2">Confirm Password</Form.Label>
                            <Col sm="10">
                                <Form.Control type='password' ref={confirmPasswordRef} required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-3 mb-1' type='submit'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to='/login'>Log In</Link>
            </div>
        </>
    )
}

export default SignUp;
