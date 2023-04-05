import axios , {AxiosError} from 'axios';
import { CodeResponse, useGoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';


import GoogleButton from './GoogleButton';

const apiGoogle = axios.create({
	baseURL: import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,	
	timeout: 1000,	
	headers: { Accept: 'application/json' },
});


const Login = () => {

	const getUser  = async(token: CodeResponse) => {
		try {
			console.log('token ', token);				
			const { data } = await apiGoogle.post(import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,  token);	
			console.log('Datos del usuario ', data);	
			return data;
		} catch (error) {
			if (axios.isCancel(error)) {
				// request cancelled
			} else if (error instanceof AxiosError) {
				throw error.response?.data || error.message;
			}
		}
		return {};
	};
	

	const googleLogin = useGoogleLogin({
		onSuccess: async (code ) => {
			try {
				const user:unknown = await getUser(code );
				console.log('usuario obtenido ', user);
			}
			catch (error) {
				console.log('Hubo un error al recuperar los datos del usuario');
			}
			
		},
		flow: 'auth-code',
	});

	return (
		<GoogleButton onClick={googleLogin}/>
	);
};

const LoginGoogle = ():JSX.Element => {	
	// const mode:boolean = (import.meta.env.MODE === 'development');
	// if (mode) console.log('clientID Value ',import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID);	
	return (
		<> 		
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string}>
				{/* <GoogleOAuthProvider clientId="742026568598-kpdtjfsrpegu6f74kld0qnnn53sfn6g0.apps.googleusercontent.com">			 */}
				<Login/>
			</GoogleOAuthProvider>
		</>				
	);
};	


apiGoogle.interceptors.response.use((response) => {
	if (response.headers.authorization) {
		localStorage.setItem('token', response.headers.authorization);
	}
	return response;
});
  
apiGoogle.interceptors.request.use((request) => {
	const token = localStorage.getItem('token');
	if (token) {
		request.headers.common.Authorization = token;
	}
	return request;
});

export default LoginGoogle;