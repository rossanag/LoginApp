// import { useState } from 'react';
import axios , {AxiosError} from 'axios';
import { CodeResponse, useGoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';
//import qs from 'qs';


import GoogleButton from './GoogleButton';
import { useEffect, useState } from 'react';



const apiGoogle = axios.create({
	baseURL: import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,	
	timeout: 6000,	
	headers: { Accept: 'application/json' },
});

type GTokens = {
	access_token: string;
	refresh_token: string;
	id_token: string;
	expiry_date: number;
}

type User = {
	name: string;
	email: string;
	picture: string;
	gtokens: GTokens;	
}


const Login = () => {
	
	// const [isLoading, setIsLoading] = useState(false);	
	
	const [user, setUser] = useState<User | null>(null);

	const [codeResponse, setCodeResponse] = useState<CodeResponse | null>();	

	
	const getUser = async(token: CodeResponse): Promise<User> => {		
		try {			
			const data  = await apiGoogle.post(import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,  token);					
			
			const user = data.data;
			const gtokens = data.data.gtokens;

			console.log('user en getUser ', user);
			console.log('gtokens en getUser ', gtokens);
												
			return user;
		} catch (error) {
			if (axios.isCancel(error)) {
				// request cancelled
			} else if (error instanceof AxiosError) {
				throw error.response?.data || error.message;
			}
		}		
		return {} as User;
	};
		
	const googleLogin = useGoogleLogin({
		onSuccess: async (code ) => {			
			try {
				const userInfo = await getUser(code );
				setCodeResponse(code);
				setUser(userInfo);					
								
			}
			catch (error) {
				console.log('Hubo un error al recuperar los datos del usuario ', error);
			}
			
		},
		flow: 'auth-code',
	});

	useEffect(() => {		
		if (user !== null) {			
						
			localStorage.setItem('user', JSON.stringify(user));											
			
		}
	},[user,codeResponse]);

	
	return (
		<>
			<GoogleButton onClick={googleLogin}/>
			<br></br>
			<br></br><br></br>
			{user ? <p>Cargo usuario {user.name}</p> : null}
			
		</>
	);
};

const LoginGoogle = ():JSX.Element => {		
	return (
		<> 		
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string}>				
				<Login/>
			</GoogleOAuthProvider>
		</>				
	);
};	


apiGoogle.interceptors.response.use(
	(response) => {
		console.log('interceptor response ', response.data);
		return response;

	}, (error) => {
		console.log('error ', error);
		if(error.response.status === 403){
			console.log('error 403');
			// refesh token
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

// Request interceptors for API calls
/* apiGoogle.interceptors.request.use(

	config => {
		const tokens = localStorage.getItem('googleToken');
		if (!tokens) return config;

		const googleToken = JSON.parse(tokens as string);
		if (googleToken.objTokens) {
			console.log(googleToken.objTokens.access_token);
			config.headers['Authorization'] = `Bearer ${googleToken.objTokens.access_token}`;
			
		}	
		return config;	
	},
	error => {
		return Promise.reject(error);
	}  

);
 */
export default LoginGoogle;
