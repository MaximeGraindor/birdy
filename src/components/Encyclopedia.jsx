import React, {useEffect, useState} from 'react'
import {Link,useRouteMatch, Route, Switch} from 'react-router-dom'
import '../css/encyclopedia.css'
import Bird from './Bird'

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
        <div className="encyclopedia">
            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <h1 className="encyclopedia-title">
                Encyclopedie
            </h1>

            <div className="encyclopedia-content">
                {
                    encyclopedie.map((bird, index) => 
                            <div key={index} className="encyclopedia-item">
                                <Link to={`${url}/${bird.slug}`} className="encyclopedia-item-link">
                                    <img src={`/img/bird/${bird.bird_img}`} alt="" className="encyclopedia-item-img"/>
                                    <span className="encyclopedia-item-name">{bird.common_name}</span>
                                </Link>
                            </div>
                        )
                }
            </div>

            <Switch>
                <Route path={`${path}/:bird`}>
                    <Bird />
                </Route>
            </Switch>

        </div>
    )
}
