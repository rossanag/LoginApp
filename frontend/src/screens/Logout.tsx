import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const Logout = () => {
    
	localStorage.clear();

	const user:User = JSON.parse(localStorage.getItem('user') as string);
	console.log('user en logout ', user);
	
	const navigate = useNavigate();
		
	useEffect(() => {
		navigate('/');
		// navigate(0);
	}, []);

	return <div />;
};

export default Logout;