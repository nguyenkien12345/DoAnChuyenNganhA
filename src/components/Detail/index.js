import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import Header from '../Header';

function Detail() {

    const [data,setData] = useState({});

    const {id} = useParams();

    useEffect(() => {
        firebase.database().ref().child(`FirebaseIOT/${id}`).get().then((snapshot) => {
            if(snapshot.exists()){
                setData({...snapshot.val()});
            }
            else{
                setData({});
            }
        })
    },[id]);

    return (
    <>
        <Header/>
        <Card className="bg-light p-2 my-4">
            <Card.Body>
                <Card.Title className='text-center alert alert-dark fw-bolder mb-4 fs-3'>Detail</Card.Title>
                <ListGroup className='w-100'>
                    <ListGroup.Item variant="primary" className="my-1 fs-5 text-start">
                        <strong className="fw-bolder">Temperature:</strong> {data.Temperature}
                    </ListGroup.Item>
                    <ListGroup.Item variant="success" className="my-1 fs-5 text-start">
                        <strong className="fw-bolder">Humidity:</strong> {data.Humidity}
                    </ListGroup.Item>
                    <ListGroup.Item variant="light" className="my-1 fs-5 text-start">
                        <strong className="fw-bolder">Date:</strong> {data.Date}
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark" className="my-1 fs-5 text-start">
                        <strong className="fw-bolder">Time:</strong> {data.Time}
                    </ListGroup.Item>
                </ListGroup>
                <Link to='/home'><Button className='mt-3 mb-1 fs5 fw-bold w-100' variant="success">Go Home</Button></Link>
            </Card.Body>
        </Card>
    </>
    )
}

export default Detail
