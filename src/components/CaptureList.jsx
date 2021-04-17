import React,{useEffect, useState, useContext} from 'react'
import {BrowserRouter, Link, useLocation, useRouteMatch, Switch, Route} from 'react-router-dom'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext'
import CapturedBird from './CapturedBird'
import '../css/captureList.css'
 
export default function CaptureList() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)
    const [captures, setCaptures] = useState([])

    let { path, url } = useRouteMatch();

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
        <div className="captureList">
            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <div className="captureList-top">
                <h1 className="captureList-title">
                    Liste de captures
                </h1>
            </div>
            
            <div className="captureList-content">
                <ul>
                    {
                        captures.map((capture, index) => 
                                <li key={index}>
                                    <Link to={`${path}/${capture.slug}`}>
                                        {capture.latin_name}
                                    </Link>
                                    <p>Capturé le : {capture.when_captured}</p>
                                </li>
                        )
                    }
                </ul>
            </div>
                <Switch>
                    <Route path={`${path}/:capturedBird`}>
                        <CapturedBird />
                    </Route>
                </Switch>
        </div>
    )
}
