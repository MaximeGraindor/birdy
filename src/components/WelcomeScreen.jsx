import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import '../css/welcomeScreen.css'
import {AuthContext} from '../utils/AuthContext' 

export default function WelcomeScreen() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)

    return (
        <div className="welcomeScreen">
            <h1 className="welcomeScreen-title">
                Birdy
            </h1>
            {
					currentUser ?
					''
					:
					<div className="welcomeScreen-linkWrap">
						<Link to="/login" className="link-login">Se connecter</Link>
						<Link to="/signup" className="link-signup">S'inscrire</Link>
					</div>
				}
        </div>
    )
}
