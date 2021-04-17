import {useContext} from 'react'
import {BrowserRouter, Redirect, Switch, Route, Link} from 'react-router-dom'

import WelcomeScreen from './components/WelcomeScreen'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import CaptureList from './components/CaptureList'
import CapturedBird from './components/CapturedBird'
import EditBird from './components/EditBird'
import BandingSite from './components/BandingSite'
import Encyclopedia from './components/Encyclopedia'
import Bird from './components/Bird'
import Users from './components/Users'
import AddBird from './components/AddBird'
import AddBandingSite from './components/AddBandingSite'
import Profil from './components/Profil'

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


					<Route exact={true} path="/capturelist" >
						<CaptureList />
					</Route>
					<Route path={`/capturelist/:capturedBird`}>
                        <CapturedBird />
                    </Route>
					<Route path={`/edit/:bird`}>
                        <EditBird />
                    </Route>


					<Route exact={true} path="/encyclopedia" >
						<Encyclopedia />
					</Route>
					<Route path={`/encyclopedia/:bird`}>
						<Bird />
					</Route>


					<Route path="/users" >
						<Users />
					</Route>
					<Route path="/bandingsite" >
						<BandingSite />
					</Route>
					<Route path="/ajouter-oiseau" >
						<AddBird />
					</Route>
					<Route path="/ajouter-site" >
						<AddBandingSite />
					</Route>
					<Route path="/profil" >
						<Profil />
					</Route>
				</Switch>

				{
					currentUser ?
					<div className="mainMenu">
						<Link to="/capturelist" className="mainMenu-captureList"><span>Liste de capture</span></Link>
						<Link to="/bandingsite" className="mainMenu-bandingSite"><span>Site de baguage</span></Link>
						<Link to="/encyclopedia" className="mainMenu-encyclopedia"><span>Encyclopédie</span></Link>
						<Link to="/users" className="mainMenu-users"><span>Utilisateurs</span></Link>
					</div>
					:
					''
				}

			</BrowserRouter>
		</div>
	);
}

export default App;
