import React, {useContext} from 'react'
import {BrowserRouter, Redirect, Switch, Route, Link} from 'react-router-dom'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext'
import '../css/home.css'

export default function Home() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)

    return (
        <div className="home">
            <h1 className="home-title">
                Home
            </h1>
            
            <div className="home-top">
                <Link to={'/ajouter-oiseau'} className="home-addBird">Ajouter un oiseau</Link>
                <button onClick={() => Firebase.auth().signOut()}> 
                    Sign Out
                </button>
            </div>

            
            
        </div>
    )
}
