import React, {useEffect, useState} from 'react'

import Firebase from '../utils/firebase'

export default function Encyclopedia() {

    const [encyclopedie, setEncyclopedie] = useState([])

    useEffect(() =>{

        const db = Firebase.firestore()

        const tempData = []

        db.collection('encyclopedie')
        .get()
        .then(snapshot =>{
            snapshot.docs.forEach(doc =>{
                setEncyclopedie(encyclopedie.push(doc.data()))
            })
        })
        console.log(encyclopedie)

    }, [])

    return (
        <div>
            <p>
                ENCYCLOPEDIE
            </p>

            <div>
            </div>
        </div>
    )
}
