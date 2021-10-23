import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import firebase from '../../firebase/firebase';

function Detail() {

    const [data,setData] = useState({});

    const {id} = useParams();

    useEffect(() => {
        firebase.database().ref().child(`${id}`).get().then((snapshot) => {
            if(snapshot.exists()){
                setData({...snapshot.val()});
            }
            else{
                setData({});
            }
        })
    },[id]);

    return (
        <Card>
            <Card.Body className='d-flex flex-column align-items-center'>
                <h2 className='text-center mt-3'>Detail</h2>
                <ListGroup className='w-100'>
                    <ListGroup.Item variant="primary" className="my-2">
                        Temperature: {data.Temperature}
                    </ListGroup.Item>
                    <ListGroup.Item variant="success" className="my-2">
                        Humidity: {data.Humidity}
                    </ListGroup.Item>
                    <ListGroup.Item variant="light" className="my-2">
                        Date: {data.Date}
                    </ListGroup.Item>
                    <ListGroup.Item variant="dark" className="my-2">
                        Time: {data.Time}
                    </ListGroup.Item>
                </ListGroup>
                <Link to='/home' className='my-3'>
                    <Button variant="primary">Go Home</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Detail
