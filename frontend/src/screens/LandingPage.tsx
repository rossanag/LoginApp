//import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';

import About from './About';
import Home from './Home';
import NotFound from './NotFound';
import Logout from './Logout';
import { LoginGoogle, Navbar, ProtectedRoute} from '../components';
import Profile from './Profile';

import {User} from './../types';


const LandingPage = () => {
	
	const user : User = JSON.parse(localStorage.getItem('user' ) as string) ;
	
	if (!user) console.log('No hay user en landing page');

	console.log('User en landing page ', user);

	const Dashboard = () => {
		
		return (
			<>
				<Navbar />
				<Outlet />
			</>					
				
		);
				
	};

	const LoginDash = () => <Outlet />;
	
	const MainBoard = () => {
		console.log('user en MainBoard ', user);
		return (
			<>				
				<Routes>											
					<Route element={ <Dashboard /> }>
						<Route
							path="index.html"
							element={user ? <ProtectedRoute>
								<Home />
							</ProtectedRoute> :<Navigate to = "/"/> } />										
						<Route
							path="home"
							element={<ProtectedRoute>
								<Home />
							</ProtectedRoute>} />										
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
						{/* <Route path="*" element={<NotFound/>}/> */}
					</Route>
					<Route element = {<LoginDash/>}>
						<Route path="/" element={ user ? <Navigate to = "/home"/> : <LoginGoogle /> }/>
					</Route>
					<Route path="*" element={<NotFound/>}/>						
					
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