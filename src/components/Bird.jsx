import React, {Fragment, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Firebase from '../utils/firebase'
import '../css/bird.css'

export default function Bird() {

    let {bird} = useParams()
    const [birdInfos, setBirdInfos] = useState([])

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('encyclopedie').where("slug", "==", bird).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setBirdInfos(data);
            })
        console.log(birdInfos);
    }, [])

    return (
        <div className="bird">
            <div className="backHome-wrap">
                <Link to={'/encyclopedia'} className="back-to-home">Revenir à l'encyclopédie</Link>
            </div>
            
            {
                    birdInfos.map(info => 
                        <div className="bird-content">
                            
                            <h1 className="encyclopedia-title">
                                {info.common_name}
                            </h1>
                            <div className="bird-content-header">
                                <img src={`/img/bird/${info.bird_img}`} alt="" className="bird-img"/>
                                <p>{info.latin_name}</p>
                                <audio  className="bird-singing" 
                                        controls
                                        src={`/media/${info.singing}`}>
                                    Your browser does not support the
                                    <code>audio</code> element.
                                </audio>
                            </div>

                            <dl className="bird-content-carats">
                                <div>
                                    <dt>Famille</dt>
                                    <dd>{info.family}</dd>
                                </div>

                                <div>
                                    <dt>Poids</dt>
                                    <dd>{info.weight} g</dd>
                                </div>

                                <div>
                                    <dt>Taille</dt>
                                    <dd>{info.size} cm</dd>
                                </div>

                                <div>
                                    <dt>Longévité</dt>
                                    <dd>{info.lifespan} ans</dd>
                                </div>

                                <div>
                                    <dt>Envergure</dt>
                                    <dd>{info.wingspan[0]} à {info.wingspan[1]} cm</dd>
                                </div>
                            </dl>

                            
                            <dl className="bird-content-bigCarats">
                                <dt>Distribution</dt>
                                <dd><img src={`/img/bird/${info.distribution_img}`} alt="" className="bird-distribution"/></dd>

                                <dt>Descriptions physique</dt>
                                <dd>{info.physical_descriptions}</dd>

                                <dt>Lieux de nidification</dt>
                                <dd>{info.nesting_sites}</dd>

                                <dt>Habitats</dt>
                                <dd>{info.habitats}</dd>

                                <dt>Alimentation</dt>
                                <dd>{info.feed}</dd>

                                <dt>Type de vol</dt>
                                <dd>{info.flight_type}</dd>
                            </dl>
                            

                            

                        </div>
                )}
        </div>
    )
}
