import React, {useState, Fragment, useContext} from 'react'
import firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext' 

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
        <div>
            <p>
                Formulaire de connection
            </p>
            <form>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="mail" name="email" id="email" placeholder="maxime.graindor@hotmail.com" onChange={e => setUser(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                </p>
                <input type="submit" value="Se connecter" onClick={authListener}/>
            </form>

            {currentUser ? currentUser.email : <div> test </div>}

        </div>
    )
}
