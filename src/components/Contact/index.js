import dateformat from 'dateformat';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import firebase from '../../firebase/firebase';
import Header from '../Header';

function Contact() {

    const {currentUser} = useAuthContext();

    const initialState = {
        phone: "",
        content: "",
    };

    const history = useHistory();

    const [state, setState] = useState(initialState);

    const { phone, content } = state;

    const [loading, setLoading] = useState(false);

    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();
        if (phone === "" || phone === null) {
            toast.error("Please Enter Your Phone. Do not leave it blank");
            return;
        }
        else if (content === "" || content === null) {
            toast.error("Please Enter Your Content. Do not leave it blank");
            return;
        }
        else {
            setLoading(true);
            const data = {
                email: currentUser.email,
                phone: Number(phone),
                content: content,
                Date: dateformat(new Date(), 'yyyy-mm-dd'),
                Time: new Date().toLocaleTimeString()
            }
            firebase.database().ref().child("Contact").push(data, (err) => {
                if (err) {
                    toast.error(err);
                }
                else {
                    toast.success("Send Email SuccessFully");
                }
            })
        }
        setTimeout(() => history.push('/home'), 500);
        setLoading(false);
    }
    return (
        <>
            <Header />
            <Card className="bg-light p-2 my-4">
                <Card.Body>
                    <Card.Title className='text-center alert alert-dark fw-bolder mb-4 fs-3'>CONTACT WITH US</Card.Title>
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='email' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control type='email' name="email" defaultValue={currentUser.email} disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group id='phone' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Phone</Form.Label>
                            <Col sm="10">
                                <Form.Control type='number' name="phone"
                                    value={phone} onChange={handleChangeValue} />
                            </Col>
                        </Form.Group>

                        <Form.Group id='phone' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Content</Form.Label>
                            <Col sm="10">
                                <Form.Control  as="textarea" type='text' name="content"
                                    value={content} onChange={handleChangeValue} />
                            </Col>
                        </Form.Group>
                        <Button variant="success" disabled={loading} className='w-100 mt-3 mb-1 fs-5 fw-bold' type='submit'>SAVE</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>

    );
}

export default Contact;
