import React, {useEffect, useState} from 'react'
import {Link,useRouteMatch, Route, Switch} from 'react-router-dom'
import UserProfile from './UserProfil'
import Firebase from '../utils/firebase'
import '../css/users.css'

export default function Users() {

    const [users, setUsers] = useState( [] )

    let { path, url } = useRouteMatch();

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('users').get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setUsers(data);
            })
    }, [])

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
                    users.map(user =>
                        <li>
                            <div>
                                <Link to={`${url}/${user.name}`} className="users-link">
                                    {user.firstname + " " + user.name}
                                </Link>
                            </div>
                            <div>
                                <p>
                                    Total de captures : 0
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

            <Switch>
                <Route path={`${path}/:user`}>
                    <UserProfile />
                </Route>
            </Switch>

        </div>
    )
}
