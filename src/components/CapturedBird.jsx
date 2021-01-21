import React, {Fragment, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Firebase from '../utils/firebase'

export default function CapturedBird() {

    let {capturedBird} = useParams()
    const [birdInfos, setBirdInfos] = useState( [] )

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('capture_list').where("latin_name", "==", capturedBird).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setBirdInfos(data);
            })
    }, [])

    return (
        <div className="capturedBird">
            <dl>
            {
                    birdInfos.map(info => 
                        <Fragment>
                        	<dt>Nom</dt>
                        	<dd>{info.latin_name}&nbsp;ans</dd>

                            <dt>Âge</dt>
                        	<dd>{info.latin_name}&nbsp;ans</dd>

                        	<dt>Sexe</dt>
                        	<dd>{info.sex}</dd>

                            <dt>Poids</dt>
                        	<dd>{info.weight}</dd>

                            <dt>Adiposité</dt>
                        	<dd>{info.adiposity}</dd>

                            <dt>Longueur alaire</dt>
                        	<dd>{info.wing_length}</dd>

                            <dt>Quand a-t-il été capturé</dt>
                        	<dd>{info.when_captured}</dd>

                            <dt>Où a-t-il été capturé</dt>
                        	<dd>{info.where_captured}</dd>

                            <dt>Comment a-t-il été capturé</dt>
                        	<dd>{info.how_captured}</dd>

                            <dt>Numéro de la bague</dt>
                        	<dd>{info.ring_number}</dd>

                            <dt>Reprise?</dt>
                        	<dd>{info.takeover}</dd>
                        </Fragment>
                )}
            </dl>
        </div>
    )
}
