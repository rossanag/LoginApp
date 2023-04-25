//import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import About from './About';
import Home from './Home';
import { LoginGoogle, Navbar, ProtectedRoute } from '../components';
import Profile from './Profile';

import {User} from './../types';
import Logout from './Logout';

const LandingPage = () => {
	
	const user : User = JSON.parse(localStorage.getItem('user' ) as string) ;
	
	if (!user) console.log('No hay user en landing page');

	console.log('User en landing page ', user);

	const Dashboard = () => {		
		return (
			<>			
				{ user && <Navbar />}
				<Routes>										
					<Route path="/" index element={ user ? <Home/> : <LoginGoogle />} />
					<Route
						path="/about"
						element={<ProtectedRoute>
							<About />
						</ProtectedRoute>} />
					<Route
						path="/profile"
						element={<ProtectedRoute>
							<Profile />
						</ProtectedRoute>} />					
					{(user) &&	
					<Route
						path="/logout"
						element={<ProtectedRoute>
							<Logout />
						</ProtectedRoute>} 
					/>								
					}
					<Route
						path="*"
						element={<Navigate to="/" />}
					/>
				</Routes>
			</>
		);
	};
	
	return (			
		<BrowserRouter>							
			<Dashboard />
		</BrowserRouter>		
		
	);
};


export default LandingPage;