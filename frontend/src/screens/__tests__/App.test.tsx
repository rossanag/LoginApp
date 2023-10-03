
import { describe, it, expect } from 'vitest';
import { render, screen, cleanup, getByAltText, fireEvent} from '@testing-library/react';
import App from '../../App';
import LandingPage from '../LandingPage';
import  GoogleButton from '../../components/GoogleButton';
// import { isButtonElement } from 'react-router-dom/dist/dom';
// import LandingPage from '../LandingPage';

describe('<App />', () => {
	// afterEach(cleanup);
	it ('App mounts properly', async () => {
		const wrapper = render(<App />);
		expect(wrapper).toBeTruthy();

		// Get by h1
		const h1 = wrapper.container.querySelector('h1');
		expect(h1?.textContent).toBe('ToDo App');

		// const button = screen.getByRole('button');
		// screen.getByRole('button' { name: 'Channels', hidden: true });
		//expect(button).toBeInTheDocument();

		

		// Get by text using the React testing library
				
	});

		
});

describe('<LangingPage />', () => {
	afterEach(cleanup);
	it ('Landing page  mounts properly', () => {
		const wrapper  = render(<LandingPage />);
		
		expect(wrapper).toBeTruthy();				
		
				
	});
		
});


describe('<GoogleButton />', () => {
	afterEach(cleanup);
	it ('Google Button mounts properly', () => {
		const wrapper  = render(<GoogleButton onClick={() => {console.log('Click Google Button');} } />);
		expect(wrapper).toBeTruthy();		
		const loginBtn = screen.getByRole('button', {name: /Sign In/i});
		expect(loginBtn).toBeInTheDocument();

		fireEvent.click(loginBtn);
		// expect(screen.getByText(/you are home/i)).toBeInTheDocument()

				
	});
		
});

describe('<Landing Page when user is logged />', () => {
	afterEach(cleanup);
	it ('Dashboard mounted', () => {
		render(<LandingPage />);
		

				
	});
		
});
