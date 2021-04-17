import React, {useEffect, useState, Fragment} from 'react'
import {useParams} from 'react-router-dom'
import Firebase from '../utils/firebase'

export default function UserProfile() {

    let  {user}  = useParams();
    const [userProfil, setUserProfil] = useState( [] )
    
    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('users').where("name", "==", user).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                console.log(data);
                setUserProfil(data);
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    userProfil.map(info => 
                        <Fragment>
                        	<li>{info.firstname}</li>
                        	<li>{info.name}</li>
                        	<li>{info.total_capture}</li>
                        </Fragment>
                )}
            </ul>
        </div>
    )
}
