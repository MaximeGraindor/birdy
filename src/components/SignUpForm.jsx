import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Firebase from '../utils/firebase'
import '../css/signUpForm.css'

export default function SignUpForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const authRegister = (e) => {
        e.preventDefault();
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user);
        })

    }

    return (
        <div className="signUpForm">
            <div className="signUpForm-top">
                <h1 className="signUpForm-title">
                    S'inscire
                </h1>
                <Link className="signUpForm-link" to={'/login'}>
                    Se connecter
                </Link>
            </div>
            <form action="#" onSubmit={authRegister} className="signUpForm-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmedPassword">Confirmation du mot de passe</label>
                    <input type="password" name="confirmedPassword" id="email" onChange={e => setConfirmedPassword(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="S'inscrire"/>
                </div>
            </form>
        </div>
    )
}
