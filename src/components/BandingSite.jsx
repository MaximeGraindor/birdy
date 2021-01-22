import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext'
import '../css/bandingSite.css'

export default function BandingSite() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)
    const [bandingSite, setBandingSite] = useState( [] )

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('banding_site')
        .where("user_id", "==", currentUser.uid)
        .get()
        .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data())
            setBandingSite(data);
            console.log(data);
        })
    }, [])

    return (
        <div className="bandingSite">
            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <div className="bandingSite-top">
                <h1 className="bandingSite-title">
                    Liste site de baguage
                </h1>
            </div>
            
            <div className="bandingSite-content">
                <ul>
                    {
                        bandingSite.map(site => 
                            <li>
                                <div className="site-top">
                                    {site.name}
                                </div>
                                <div className="site-bot">
                                    <p>
                                        latitude : {site.position.latitude}
                                    </p>
                                    <p>
                                        Longitude : {site.position.longitude}
                                    </p>
                                    <p>
                                        area : {site.area}
                                    </p>
                                </div>
                            </li>
                            )
                    }
                </ul>
            </div>

        </div>
    )
}
