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
        if(emailRef.current.value === null || emailRef.current.value === ""){
            setError('Please enter your email');
            return;
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value))){
            setError('Wrong email format');
            return;
        }
        else if(passwordRef.current.value === null || passwordRef.current.value === ""){
            setError('Please enter your password');
            return;
        }
        else if(passwordRef.current.value.length < 6 || passwordRef.current.value.length > 64){
            setError('Minimum password length is 6 and Maximum password length is 64');
            return;
        }
        else if(passwordRef.current.value !== confirmPasswordRef.current.value){
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
            <Card className="bg-light p-2">
                <Card.Img className="my-3" variant="top" src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80" height="250px"/>
                <Card.Body>
                    <Card.Title className='text-center alert alert-dark fw-bolder mb-4 fs-3'>Sign Up</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={onHandleSubmit} noValidate>
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

                        <Form.Group id='confirmPassword' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Confirm Password</Form.Label>
                            <Col sm="10">
                                <Form.Control type='password' ref={confirmPasswordRef} required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} variant="success" className='w-100 mt-3 mb-1 fs-5 fw-bold' type='submit'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-3 fs-5'>
                    Already have an account?&nbsp; 
                    <Link to='/login'>Log In</Link>
            </div>
        </>
    )
}

export default SignUp;
