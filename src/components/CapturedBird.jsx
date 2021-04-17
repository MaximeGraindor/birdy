import React, {Fragment, useState, useEffect} from 'react'
import {useParams, Link, Switch, Route} from 'react-router-dom'
import Firebase from '../utils/firebase'
import EditBird from './EditBird'
import '../css/capturedBird.css'

export default function CapturedBird() {

    let {capturedBird} = useParams()
    const [birdInfos, setBirdInfos] = useState( [] )

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('capture_list').where("slug", "==", capturedBird).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setBirdInfos(data);
            })
    }, [])

    return (
        <div className="capturedBird">
            <div className="backHome-wrap">
                <Link to={'/capturelist'} className="back-to-home">Revenir à la liste</Link>
                
            </div>
            {
                    birdInfos.map(info => 
                        <div className="capturedBird-content">
                        	<h1 className="capturedBird-title">
                            {info.latin_name}
                            </h1>
                            <div className="captured-bird-edit">
                                <Link to={`/edit/${info.slug}/`} className="captured-bird-edit-link">Modifier la fiche</Link>
                            </div>
                            <p className="capturedBird-date">Capturé le {info.when_captured}</p>

                            <dl className="capturedBird-content-carats">
                                <div>
                                    <dt>Sexe</dt>
                                    <dd>{info.sex}</dd>
                                </div>

                                <div>
                                    <dt>Âge</dt>
                                    <dd>{info.age} ans</dd>
                                </div>

                                <div>
                                    <dt>Poids</dt>
                                    <dd>{info.weight} g</dd>
                                </div>

                                <div>
                                    <dt>Adiposité</dt>
                                    <dd>{info.adiposity} cm</dd>
                                </div>

                                <div>
                                    <dt>Longueur alaire</dt>
                                    <dd>{info.wing_length} cm</dd>
                                </div>
                            </dl>

                            <dl className="capturedBird-content-bigCarats">
                                <dt>Où a-t-il été capturé</dt>
                                <dd>{info.where_captured}</dd>

                                <dt>Comment a-t-il été capturé</dt>
                                <dd>{info.how_captured}</dd>

                                <dt>Reprise ?</dt>
                                <dd>{info.takeover}</dd>
                            </dl>
                        </div>
                )}

                <Switch>
                    <Route path={`/edit/:capture`}>
                        <EditBird />
                    </Route>
                </Switch>

        </div>
    )
}
