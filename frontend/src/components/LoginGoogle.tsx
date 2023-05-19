import { useState, useEffect} from 'react';
import axios , {AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';
import { CodeResponse, useGoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';

import GoogleButton from './GoogleButton';

import {User} from '../types';


const apiGoogle = axios.create({
	baseURL: import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,	
	timeout: 6000,	
	headers: { Accept: 'application/json' },
});

const Login = () => {
	
	const [user, setUser] = useState<User | null>(null);	
	const [, setCodeResponse] = useState<CodeResponse | null >();		
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const getUser = async(token: CodeResponse): Promise<User> => {		
		try {			
			setLoading(true);
			const data  = await apiGoogle.post(import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,  token);					
			
			const user = data.data;
			const gtokens = data.data.gtokens;
			setError(false);			

			console.log('user en getUser ', user);
			console.log('gtokens en getUser ', gtokens);	

			
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + gtokens['access_token'];
			// after any request we have the user authenticated with this sentences
												
			return user as User;
		} catch (error) {
			if (axios.isCancel(error)) {
				// request cancelled
			} else if (error instanceof AxiosError) {
				throw error.response?.data || error.message;
			}
			setError(true);		
		}		
		return {} as User;
	};
		
	const googleLogin = useGoogleLogin({				
		onSuccess: async (code ) => {				
			try {
				const userInfo = await getUser(code );
				setCodeResponse(code);			
				setUser(userInfo);	
				console.log('user en googleLogin ', userInfo);			
			}
			catch (error) {
				console.log('Hubo un error al recuperar los datos del usuario ', error);
			}
			
		},
		flow: 'auth-code',
	});

	useEffect(() => {		
		console.log('user en useEffect ', user);
		if (user) {		
			console.log('user en useEffect dentro del if', user);
			localStorage.setItem('user', JSON.stringify(user));																	
			setLoading(false);				
			navigate('home', {replace: true});									
		}	
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[user]); 
		
	
	return (
		<>
			<GoogleButton onClick={googleLogin}/>
			<br></br>
			<br></br><br></br>
			{error ? 
				<p>Hubo un error al recuperar los datos del usuario</p> 
				:
				(loading ?	<p>Cargando...</p> :
					!user ? null :	<p>Cargó usuario {user?.name}</p>) 					 									 										
			}			
		</>
	);		
};

const LoginGoogle = ():JSX.Element => {		
	console.log('login google');
	return (
		<> 		
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string}>				
				<Login/>
			</GoogleOAuthProvider>
		</>				
	);
};	

const refreshToken = async () => {
	const user: User = JSON.parse(localStorage.getItem('user') as string);
	const refreshToken = user.gtokens.refresh_token;	
	
	const { data } = await axios.post(
		'/auth/google/refresh-token',
		{
			refreshToken: refreshToken,
		},
	);

	return data;
};

apiGoogle.interceptors.response.use(
	(response) => {		
		return response;

	}, (error) => {
		console.log('error ', error);
		if(error.response.status === 403){
			console.log('error 403');			
		}
		if(error.response.status === 401){
			console.log('error 401');
			// refesh token goes here
			(async () => {
				const data = await refreshToken();
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
			})();			
			// end refresh
		}
	});
  
/* apiGoogle.interceptors.request.use((request) => {
	console.log('interceptor request ', request.data);
	const token = localStorage.getItem('token');
	if (token) {
		request.headers.common.Authorization = token;
	}
	return request;
	
}); */

export default LoginGoogle;
