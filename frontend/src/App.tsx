import { useState } from 'react';
import   { Button } from './components/common/Button';

import './App.css';

const App = () => {
	const [count, setCount] = useState(0);

	// const onClick = () => { console.log('Hola!'); };

	return (
		<div className="App">						
			<h1>LoginApp with React 18</h1>
			<div className="card">
				{/* <button onClick={() => setCount((count) => count + 1)}> */}
				<Button color="bg-sky-700" width="100" height="400" radius="20" onClick={() => setCount((count) => count + 1)} >Sign In - count is {count}</Button>	          

				<p>
		Edit <code>src/App.tsx</code> and save to test automatic changes
				</p>
			</div>		
		</div>
	);
};

export default App;
