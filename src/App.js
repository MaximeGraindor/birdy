import {useContext} from 'react'
import {BrowserRouter, Redirect, Switch, Route, Link} from 'react-router-dom'

import WelcomeScreen from './components/WelcomeScreen'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import CaptureList from './components/CaptureList'
import BandingSite from './components/BandingSite'
import Encyclopedia from './components/Encyclopedia'
import Users from './components/Users'
import AddBird from './components/AddBird'

import '../src/css/loginForm.css'

import {AuthContext} from './utils/AuthContext'


function App() {

	const [currentUser] = useContext(AuthContext);

	return (
		<div className="App">

			<BrowserRouter>
				{currentUser ? <Redirect to="/home" /> : <Redirect to="/" />}
				
				

				<Switch>
					<Route exact path="/" >
						<WelcomeScreen />
					</Route>
					<Route path="/home" >
						<Home />
					</Route>
					<Route path="/login" >
						<LoginForm />
					</Route>
					<Route path="/signup" >
						<SignUpForm />
					</Route>

					<Route path="/capturelist" >
						<CaptureList />
					</Route>
					<Route path="/bandingsite" >
						<BandingSite />
					</Route>
					<Route path="/encyclopedia" >
						<Encyclopedia />
					</Route>
					<Route path="/users" >
						<Users />
					</Route>

					<Route path="/ajouter-oiseau" >
						<AddBird />
					</Route>
				</Switch>

				{
					currentUser ?
					<div>
						<Link to="/capturelist">Liste de capture</Link>
						<Link to="/bandingsite">Site de baguage</Link>
						<Link to="/encyclopedia">Encyclopédie</Link>
						<Link to="/users">Utilisateurs</Link>
					</div>
					:
					''
				}

			</BrowserRouter>
		</div>
	);
}

export default App;
