import React, {useState} from 'react'
import Firebase from '../utils/firebase'

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
        <div>
            <form action="#" onSubmit={authRegister}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmedPassword">Confirmation du mot de passe</label>
                    <input type="confirmedPassword" name="confirmedPassword" id="email" onChange={e => setConfirmedPassword(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="S'inscrire"/>
                </div>
            </form>
        </div>
    )
}
