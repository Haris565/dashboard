import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)

    return (
        
        <Route
        {...restOfProps}
        render={(props) =>
            isAuthenticated && user?.profileComplete ? 
            <Component {...props} /> 
            :  
            isAuthenticated && !user?.profileComplete ? <Redirect to="/profile" /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;