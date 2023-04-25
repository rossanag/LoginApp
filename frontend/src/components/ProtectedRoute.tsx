import React from 'react';
import { Navigate } from 'react-router-dom';

interface IProps{
    children: JSX.Element;
}

const ProtectedRoute = ( {children}: IProps ):JSX.Element => {
	const user = JSON.parse(localStorage.getItem('user') as string);

	console.log('protected route user', user);
    
	if (!user) {
		return <Navigate to="/"/>;
	}
	console.log('children ');
	return children;
};

export default ProtectedRoute;

