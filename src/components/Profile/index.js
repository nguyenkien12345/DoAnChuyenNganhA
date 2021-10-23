import React, { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContextProvider';

function Profile() {

    const {handleLogOut,currentUser} = useAuthContext();

    const history = useHistory();

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
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className='mb-3'>
                        <strong>Email:</strong> {currentUser.email}
                    </div>
                    <Link to='/update-profile' className='btn btn-primary w-100 mb-1'>
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={onHandleLogOut}>Log Out</Button>
            </div>
        </>
    )
}

export default Profile;
