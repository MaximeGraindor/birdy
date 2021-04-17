import React, {useEffect, useState} from 'react'
import {Link,useRouteMatch, Route, Switch} from 'react-router-dom'
import UserProfile from './UserProfil'
import Firebase from '../utils/firebase'
import '../css/users.css'

export default function Users() {

    const [users, setUsers] = useState( [] )
    const [nbrCapture, setNbrCapture] = useState( [] )
    

    let { path, url } = useRouteMatch();

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('users').get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setUsers(data);
            })
    }, [])

    /* const totalCaptureCount = (userEmail) => {
        const db = Firebase.firestore()
        db.collection('capture_list').where("user_email", "==", userEmail).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                console.log(data);
                setNbrCapture(data);
            }
        )
        return nbrCapture.length;
    } */

    return (
        <div className="users">
            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <h1 className="users-title">
                Communautée
            </h1>
            <div className="users-content">
                <ul>
                {
                    users.map((user, index) =>
                        <li key={index}>
                            <div>
                                <p className="user-name">
                                    {user.firstname + " " + user.name}
                                </p>
                            </div>
                            <div className="user-info">
                                <p>
                                    Total de captures : 0 {/* {totalCaptureCount(user.email)} */}
                                </p>
                                <p>
                                    Sites enregistrés : 0
                                </p>
                            </div>
                        </li>
                        )
                }
                </ul>
            </div>
        </div>
    )
}
