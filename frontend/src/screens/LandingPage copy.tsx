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

	
	const MainBoard = () => {
		console.log('user en MainBoard ', user);
		return (
			<>
				{ user && <Navbar /> }
				<Routes>				
					<Route path="/" element={ (user) ?  <Navigate to="home" /> : <LoginGoogle />} /> 
					<Route
						path="home"
						element={<ProtectedRoute>
							<Home />
						</ProtectedRoute>} 
					/>					
					<Route
						path="profile"
						element={<ProtectedRoute>
							<Profile />
						</ProtectedRoute>} />										
					<Route
						path="about"
						element={<ProtectedRoute>
							<About />
						</ProtectedRoute>} />	
					<Route
						path="logout"
						element={<ProtectedRoute>
							<Logout />
						</ProtectedRoute>} 
					/>
					<Route path="*" element={<Navigate to="/" />}/>				
				</Routes> 
			</>
		);
	};

		
	return (			
		<BrowserRouter>							
			<MainBoard />
		</BrowserRouter>		
		
	);
};


export default LandingPage;