import {BrowserRouter, Redirect, Switch, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Redirect to="/home" />

				<div>
					<Link to="/home">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign up</Link>
				</div>

				<Switch>
					<Route path="/home" >
						<Home />
					</Route>
					<Route path="/login" >
						<LoginForm />
					</Route>
					<Route path="/signup" >
						<SignUpForm />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
