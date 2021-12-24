import React, { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';
import Header from '../Header';

function Profile() {

    const history = useHistory();

    const {handleLogOut,currentUser} = useAuthContext();

    const [error, setError] = useState('');

    const onHandleLogOut = async() => {
        try{
            setError('');
            await handleLogOut();
            history.push('/login');
        }
        catch{
            setError('Failed to log out! Please try again!');
        }
    }

    return (
        <>
            <Header/>
            <Card className="bg-light p-2 my-4">
                <Card.Img variant="top" src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300" height="250px" className="my-3"/>
                <Card.Body>
                    <Card.Title className='text-center alert alert-dark fs-3 fw-bolder mb-4'>Profile</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Card.Text className='fs-5'><strong>Email:</strong> {currentUser.email}</Card.Text>
                    <Link to='/update-account' className='btn btn-success w-100 mb-1 mt-3 fs-5 fw-bold'>Update Account</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={onHandleLogOut} className="fs-5 mt-3">Log Out</Button>
            </div>
        </>
    )
}

export default Profile;
