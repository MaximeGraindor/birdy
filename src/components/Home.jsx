import React, {useContext} from 'react'
import {BrowserRouter, Redirect, Switch, Route, Link} from 'react-router-dom'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext' 

export default function Home() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)

    return (
        <div>
            <p>
                Home
            </p>

            <button onClick={() => Firebase.auth().signOut()}> 
                Sign Out
            </button>
            <Link to={'ajouter-oiseau'}>Ajouter un oiseau</Link>
        </div>
    )
}
