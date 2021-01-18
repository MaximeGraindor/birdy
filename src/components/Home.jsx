import React from 'react'
import {BrowserRouter, Redirect, Switch, Route, Link} from 'react-router-dom'
import Firebase from '../utils/firebase'

export default function Home() {
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
