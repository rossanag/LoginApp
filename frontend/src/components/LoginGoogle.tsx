import axios , {AxiosError} from 'axios';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import GoogleButton from './GoogleButton';


const apiGoogle = axios.create({
	baseURL: process.env.REACT_APP_GOOGLE_OAUTH_ENDPOINT,
	timeout: 1000,	
	headers: { Accept: 'application/json' },
});


const getUser  = async(token: CodeResponse) => {
	try {
		const { data } = await apiGoogle.post(process.env.REACT_APP_GOOGLE_OAUTH_ENDPOINT as string,  token);
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

const LoginGoogle = () => {

	const googleLogin = useGoogleLogin({
		onSuccess: async (code ) => {
			try {
				const user:unknown = await getUser(code );
				console.log({user});
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