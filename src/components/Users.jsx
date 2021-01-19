import React, {useEffect, useState} from 'react'
import {Link,useRouteMatch, Route, Switch} from 'react-router-dom'
import UserProfile from './UserProfil'
import Firebase from '../utils/firebase'

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
        <div>
            <p>
                USERS
            </p>
            <div>
                {
                    users.map(user =>
                        <Link to={`${url}/${user.name}`}>
                            {
                                user.name
                            }
                        </Link>)
                }
            </div>

            <Switch>
                <Route path={`${path}/:user`}>
                    <UserProfile />
                </Route>
            </Switch>

        </div>
    )
}
