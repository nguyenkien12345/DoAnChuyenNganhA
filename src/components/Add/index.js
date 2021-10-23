import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from '../../firebase/firebase';

function Add() {

    const initialState = {
        humidity: "",
        temperature: "",
        status: "",
    };

    const history = useHistory();

    const [state,setState] = useState(initialState);

    const {humidity,temperature,status} = state;

    const [loading,setLoading] = useState(false);

    const handleChangeValue = (event) => {
        const {name,value} = event.target;
        setState({...state, [name]:value});
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();
        if(temperature === "" || temperature === null){
            toast.error("Please Enter Your Temperature. Do not leave it blank");         
        }
        else if(humidity === "" || humidity === null){
            toast.error("Please Enter Your Humidity. Do not leave it blank");         
        }
        else if(status === "" || status === null){
            toast.error("Please Enter Your Status. Do not leave it blank");         
        }
        else {
            setLoading(true);
            const data = {
                Temperature: parseFloat(temperature),
                Humidity: parseFloat(humidity),
                Status: status,
                Date: new Date().toDateString(),
                Time: new Date().toLocaleTimeString()
            }
            firebase.database().ref().push(data, (err) => {
                if(err) {
                    toast.error(err);
                }
                else{
                    toast.success("Added SuccessFully");
                }
            })
        }
        setTimeout(() => history.push('/home'),500);
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>CREATE NEW DATA</h2>
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='temperature' className="mb-3" as={Row}>
                            <Form.Label column sm="2">Temperature</Form.Label>
                            <Col sm="10">
                                <Form.Control type='number' name="temperature"  
                                value={temperature} onChange={handleChangeValue}/>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group id='humidity' className="mb-3" as={Row}>
                            <Form.Label column sm="2">Humidity</Form.Label>
                            <Col sm="10">
                                <Form.Control type='number' name="humidity"  
                                value={humidity} onChange={handleChangeValue}/>
                            </Col>
                        </Form.Group>

                        <Form.Group id='status' className="mb-3" as={Row}>
                            <Form.Label column sm="2">Status</Form.Label>
                            <Col sm="10">
                                <Form.Control type='text' name="status"  
                                value={status} onChange={handleChangeValue}/>
                            </Col>
                        </Form.Group>
                        <Button variant="success" disabled={loading} className='w-100 mt-3' type='submit'>
                            SAVE
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Add;
