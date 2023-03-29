import axios from 'axios';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import GoogleButton from './GoogleButton';


const apiGoogle = axios.create({
	baseURL: 'REACT_APP_GOOGLE_OAUTH_ENDPOINT',
	timeout: 1000,	
	headers: { Accept: 'application/json' },
});


const LoginGoogle = (token: CodeResponse) => {

	const googleLogin = useGoogleLogin({
		onSuccess: async ({ code }) => {
			const tokens = await apiGoogle.post('REACT_APP_GOOGLE_OAUTH_ENDPOINT', {  // http://localhost:3001/auth/google backend that will exchange the code
				code,
			});
  
			console.log(tokens);
		},
		flow: 'auth-code',
	});

	<GoogleButton onClick={googleLogin}/>;
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