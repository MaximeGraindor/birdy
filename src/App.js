import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'
import Home from './components/Home'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Redirect to="/home" />

				<Switch>
					<Route path="/home" >
						<Home />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
