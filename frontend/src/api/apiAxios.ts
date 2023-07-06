import axios , {AxiosError} from 'axios';

import { User } from '../types';
import { useLocalStorage } from '../hooks';

export const apiGoogle = axios.create({
	baseURL:  import.meta.env.VITE_GOOGLE_OAUTH_ENDPOINT,
	timeout: 6000,	
	headers: { Accept: 'application/json' },
});

export const refreshToken = async (user:User) => {
	const controller = new AbortController();

	// const user: User = JSON.parse(localStorage.getItem('user') as string);	//cuando no se usa el hook	
	const refreshToken = user.gtokens.refresh_token;	
	try {
		const { data } = await axios.post(
			'/auth/google/refresh-token',
			{
				refreshToken: refreshToken,
			},
		);
		return data;
	}    
	catch (error) {
		if (axios.isCancel(error)) {
			// request cancelled	
			controller.abort(); 			
            
		} else if (error instanceof AxiosError) {
			throw error.response?.data || error.message;
		}
	}
};

apiGoogle.interceptors.response.use (
	(response) => {		
		return response;

	}, (error) => {
		const [user] = useLocalStorage<User | null>('user', null);	
		console.log('error ', error);
		if(error.response.status === 403){
			console.log('error 403');			
		}
		if(error.response.status === 401){
			console.log('error 401');
			// refesh token goes here
			(async () => {
				try {
					const data = await refreshToken(user as User);
					axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
				}
				catch (error) {
					console.log('error ', error);
				}
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



