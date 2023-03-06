import { useState } from 'react';
import   Button  from './components/Button';

import viteLogo from '../../public/vite.svg';

import './App.css';

const App = () => {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<img src={viteLogo} alt="Vite Logo" />
			<div>
				<Button contenido={'Hello there!'}/>	
			</div>
			<h1>LoginApp with React 18</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
          count is {count}
				</button>
				<p>
		Edit <code>src/App.tsx</code> and save to test automatic changes
				</p>
			</div>		
		</div>
	);
};

export default App;
