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
                console.log(data);
                setBirdInfos(data);
            })
    }, [])

    return (
        <div>
            <ul>
            {
                    birdInfos.map(info => 
                        <Fragment>
                        	<li>{info.latin_name}</li>
                        	<li>{info.age}</li>
                        	<li>{info.sexe}</li>
                        </Fragment>
                )}
            </ul>
        </div>
    )
}
