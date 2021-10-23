import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';

function PrivateRoute({component: Component,...rest}) {

    const {currentUser} = useAuthContext();

    return (
        <Route
            {...rest}
            render={props => {
               return currentUser ? <Component {...props} /> : <Redirect to='/login' />
            }}
        />
    )
}

export default PrivateRoute;
