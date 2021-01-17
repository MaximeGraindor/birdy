import React, {useEffect, useState} from 'react'
import {Link,useRouteMatch, Route, Switch} from 'react-router-dom'

import Firebase from '../utils/firebase'

export default function Encyclopedia() {

    const [encyclopedie, setEncyclopedie] = useState([])

    let { path, url } = useRouteMatch();

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('encyclopedie').get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setEncyclopedie(data);
            })
    }, [])

    return (
        <div>
            <p>
                ENCYCLOPEDIE
            </p>

            <div>
                {encyclopedie.map(bird => <p>{bird.name}</p>)}
            </div>
        </div>
    )
}
