import React, {Fragment, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Firebase from '../utils/firebase'

export default function Bird() {

    let {bird} = useParams()
    const [birdInfos, setBirdInfos] = useState( [] )

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('encyclopedie').where("name", "==", bird).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setBirdInfos(data);
                console.log(birdInfos);
                console.log(bird);
            })
    }, [])

    return (
        <div className="capturedBird">
            <dl>
            {
                    birdInfos.map(info => 
                        <Fragment>
                        	<dt>Nom</dt>
                        	<dd>{info.name}</dd>

                            <dt>Espece</dt>
                        	<dd>{info.espece}&nbsp;</dd>

                        	<dt>Ordre</dt>
                        	<dd>{info.ordre}</dd>

                            <dt>Famille</dt>
                        	<dd>{info.famille}</dd>
                            
                            <dt>Genre</dt>
                        	<dd>{info.genre}</dd>

                            <dt>Envergure</dt>
                        	<dd>{info.envergure}</dd>

                            <dt>Descripteur</dt>
                        	<dd>{info.descripteur}</dd>

                            <dt>Longévité</dt>
                        	<dd>{info.longevite}</dd>

                            <dt>Poids</dt>
                        	<dd>{info.poids}</dd>

                        </Fragment>
                )}
            </dl>
        </div>
    )
}
