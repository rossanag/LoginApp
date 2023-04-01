import { LoginGoogle } from './components';
import './App.css';

const App = () => {	

	// const onClick = () => { console.log('Hola!'); };

	return (
		<div className="App">						
			<h1>LoginApp with React 18</h1>
			<div className="card">				
				{/* 				<GoogleButton onClick={onClick}/> */}
				<LoginGoogle/>

				<p>
		Edit <code>src/App.tsx</code> and save to test automatic changes
				</p>
			</div>		
		</div>
	);
};

export default App;
