import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from '../../firebase/firebase';
import Header from '../Header';
import dateformat from 'dateformat';

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
            return;       
        }
        else if(humidity === "" || humidity === null){
            toast.error("Please Enter Your Humidity. Do not leave it blank");   
            return;       
        }
        else if(status === "" || status === null){
            toast.error("Please Select Your Status");       
            return;       
        }
        else {
            setLoading(true);
            const data = {
                Temperature: parseFloat(temperature),
                Humidity: parseFloat(humidity),
                Status: status,
                Date: dateformat(new Date(), 'yyyy-mm-dd'),
                Time: new Date().toLocaleTimeString()
            }
            firebase.database().ref().child("FirebaseIOT").push(data, (err) => {
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
            <Header/>
            <Card className="bg-light p-2 my-4">
                <Card.Body>
                    <Card.Title className='text-center alert alert-dark fw-bolder mb-4 fs-3'>CREATE NEW DATA</Card.Title>
                    <Form onSubmit={onHandleSubmit}>
                        <Form.Group id='temperature' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Temperature</Form.Label>
                            <Col sm="10">
                                <Form.Control type='number' name="temperature"  
                                value={temperature} onChange={handleChangeValue}/>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group id='humidity' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Humidity</Form.Label>
                            <Col sm="10">
                                <Form.Control type='number' name="humidity"  
                                value={humidity} onChange={handleChangeValue}/>
                            </Col>
                        </Form.Group>

                        <Form.Group id='status' className="mb-3" as={Row}>
                            <Form.Label column sm="2" className="text-start text-uppercase fw-bolder">Status</Form.Label>
                            <Col sm="10">
                                <select name="status"  value={status} onChange={handleChangeValue} className="w-100 h-100">
                                <option>Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                </select>
                            </Col>
                        </Form.Group>
                        <Button variant="success" disabled={loading} className='w-100 mt-3 mb-1 fs-5 fw-bold' type='submit'>SAVE</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Add;
