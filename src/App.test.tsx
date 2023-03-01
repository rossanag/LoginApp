import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  {useState as useStateMock} from 'react';
import App from './App';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));
const setState = jest.fn();

describe('Testing example', () => {
	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// Accepts a function that will be used as an implementation of the mock for one call to the mocked function. 
		// Can be chained so that multiple function calls produce different results.
		useStateMock.mockImplementation((init: any) => [init, setState]);
	});


	it('renders Vite + React 18 + Typescript + Tailwindcss', () => {		
		const {container } = render(  <App/>);     
		expect(container).toMatchSnapshot();
	});
	it('renders the button', () => {
		render(  <App/>);		
		// expect(textElement).toBeInTheDocument();
		const btn = screen.getByRole('button', { name: /count is/i });
		expect(btn).toMatchSnapshot();
	});    	
	it('click the button', () => {
		render(  <App/>);		
		// expect(textElement).toBeInTheDocument();
		const btn = screen.getByRole('button', { name: /count is/i });
		userEvent.click(btn);
		expect(btn).toMatchSnapshot();
	});    	
		
	it('App loads with initial state of 0', () => {		
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		useStateMock.mockImplementationOnce(() => [0, setState]);        
		render(<App/>);
		const btn = screen.getByRole('button', { name: /count is 0/i });
		expect(btn).toMatchSnapshot();
	});	


});