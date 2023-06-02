import { Navigate, Outlet } from 'react-router-dom';

import { useLocalStorage } from '../hooks';
import {User} from '../types';

interface IProps {
    children: JSX.Element;
}

const ProtectedRoute = ( {children}: IProps ): JSX.Element => {
	const [user,] = useLocalStorage<User | null>('user',null);
	// const user:User = JSON.parse(localStorage.getItem('user') as string);

	console.log('protected route user', user);
    
	if (!user) {
		return <Navigate to="/" />;
		
	}
	console.log('children ');
	return children ? children : <Outlet/>;	
	//return children;
};

export default ProtectedRoute;

