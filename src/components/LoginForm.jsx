import React, {useState, Fragment, useContext} from 'react'
import {Link} from 'react-router-dom'
import firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext' 
import '../css/loginForm.css'

export default function LoginForm() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const authListener = (e) => {
        e.preventDefault()

        firebase.auth().signInWithEmailAndPassword(user, password)
        .then((user) => {
            setCurrentUser(user);
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(error.code + ": " + errorMessage);
          });
    }

    return (
        <div className="loginForm">
            <div className="loginForm-top">
                <h1 className="loginForm-title">
                    Se connecter
                </h1>
                <Link className="loginform-link" to={'/signup'}>
                    S'inscrire
                </Link>
            </div>
            <form className="loginForm-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="maxime.graindor@hotmail.com" onChange={e => setUser(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Se connecter" onClick={authListener}/>
            </form>
        </div>
    )
}
