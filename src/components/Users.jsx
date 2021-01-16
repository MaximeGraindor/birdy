import React, {useEffect, useState} from 'react'
import Firebase from '../utils/firebase'

export default function Users() {

    const [users, setUsers] = useState( [] )

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
                    users.map(user => <p>{user.name}</p>)
                }
            </div>
        </div>
    )
}
