import React,{useEffect, useState, useContext} from 'react'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext' 

export default function CaptureList() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)
    const [captures, setCaptures] = useState([])

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('capture_list').where("user_id", "==", currentUser.uid)
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data())
            setCaptures(data);
        })
    }, [])
    
    return (
        <div>
            <p>
                LISTE DE CAPTURE
            </p>
            
            <div>
                {
                    captures.map(capture => 
                            <span>{capture.latin_name}</span>
                    )
                }
            </div>

        </div>
    )
}
