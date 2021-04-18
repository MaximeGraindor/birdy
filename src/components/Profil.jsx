import React, {Fragment, setState, useContext, useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext'
import '../css/userProfil.css'

export default function Profil() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)
    const [informations, setInformations] = useState([])

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('users').where("email", "==", currentUser.email)
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data())
            setInformations(data);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const db = Firebase.firestore()
        db.collection('users').where("email", "==", currentUser.email).get().then(function(querySnapshot){
            querySnapshot.forEach(function(document){
                document.ref.update({
                    "firstname" : e.target.elements.firstname.value,
                    "name" : e.target.elements.name.value
                })
            });
        })
    }

    return (
        <div className="userProfil">

            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <div className="userProfil-top">
                <h1 className="userProfil-title">
                    Mon profil
                </h1>
            </div>
            <div className="user-content">
                <ul>
                    {
                        informations.map(info => 
                                <dl>
                                    <dt>Prénom</dt>
                                    <dd>{info.firstname}</dd>
                                    <dt>Nom</dt>
                                    <dd>{info.name}</dd>
                                    <dt>Email</dt>
                                    <dd>{info.email}</dd>
                                </dl>
                            )
                    }
                </ul>
            </div>
            
            <div className="user-update">
                <h2>Modifier son profil</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="userUpdate-name">
                        <label htmlFor="name">Nom</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="userUpdate-firstname">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" id="firstname" />
                    </div>
                    <div className="userUpdate-submit">
                        <input type="submit" value="Envoyer"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
