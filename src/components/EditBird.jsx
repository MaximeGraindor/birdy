import React,{useEffect, useState, useContext, Fragment} from 'react'
import {useParams, Link} from 'react-router-dom'
import Firebase from '../utils/firebase'

export default function EditBird() {

    let {bird} = useParams()
    const [birdInfos, setBirdInfos] = useState([])

    useEffect(() => {
        const db = Firebase.firestore()
        db.collection('capture_list').where("slug", "==", bird).get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                setBirdInfos(data);
            })
    }, [birdInfos])

    const handleSubmit = (e) => {
        e.preventDefault()
        const db = Firebase.firestore()
        db.collection('capture_list').where("slug", "==", bird).get().then(function(querySnapshot){
            querySnapshot.forEach(function(document){
                document.ref.update({
                    latin_name: e.target.elements.latinName.value ? e.target.elements.latinName.value : e.target.elements.latinName.placeholder,
                    wing_length: e.target.elements.wingLength.value ? e.target.elements.wingLength.value :e.target.elements.wingLength.placeholder,
                    weight: e.target.elements.weight.value ? e.target.elements.weight.value : e.target.elements.weight.placeholder,
                    adiposity: e.target.elements.adiposity.value ? e.target.elements.adiposity.value : e.target.elements.adiposity.placeholder,
                    sex: e.target.elements.sex.value,
                    age: e.target.elements.age.value ? e.target.elements.age.value : e.target.elements.age.placeholder,
                    how_captured: e.target.elements.howCaptured.value ? e.target.elements.howCaptured.value : e.target.elements.howCaptured.placeholder,
                    when_captured: e.target.elements.whenCaptured.value ? e.target.elements.whenCaptured.value : e.target.elements.whenCaptured.placeholder,
                    where_captured: e.target.elements.whereCaptured.value ? e.target.elements.whereCaptured.value : e.target.elements.whereCaptured.placeholder,
                    ring_number: e.target.elements.ringNumber.value ? e.target.elements.ringNumber.value : e.target.elements.ringNumber.placeholder,
                    takeover: e.target.elements.takeover.value,
                })
                
            });
           
        }) 
        console.log(e.target.elements.wingLength.placeholder);
    }

    return (
        <div className="addBird">

            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            {
                birdInfos.map(info => 
                    <Fragment>
                        <div className="addBird-top">
                            <h1 className="addBird-title">
                                edit {info.latin_name}
                            </h1>
                        </div>
                        <form action="#" className="addBird-form" onSubmit={handleSubmit}>
                            <div className="addBird-latinName">
                                <label htmlFor="latinName">Nom latin*</label>
                                <input type="text" name="latinName" id="latinName" placeholder={info.latin_name}/>
                            </div>
                                        
                            <div className="addBird-wingLength">
                                <label htmlFor="wingLength">Longueur Alaire*</label>
                                <input type="text" name="wingLength" id="wingLength" placeholder={info.wing_length} />
                            </div>
            
                            <div className="addBird-weight">
                                <label htmlFor="weight">Poids*</label>
                                <input type="text" name="weight" id="weight" placeholder={info.weight}/>
                            </div>
                        
                            <div className="addBird-adiposity">
                                <label htmlFor="adiposity">Adiposité*</label>
                                <input type="text" name="adiposity" id="adiposity" placeholder={info.adiposity} />
                            </div>
                        
                            <div className="addBird-latinName">
                                <label htmlFor="sex">Sexe*</label>
                                <select name="sex" id="sex">
                                    <option value="mâle">Mâle</option>
                                    <option value="femelle">Femelle</option>
                                </select>
                            </div>
                        
                            <div className="addBird-age">
                                <label htmlFor="age">Âge*</label>
                                <input type="text" name="age" id="age" placeholder={info.age}/>
                            </div>
            
                            <div className="addBird-howCaptured">
                                <label htmlFor="howCaptured">Comment a-t-il été capturé ?*</label>
                                <input type="text" name="howCaptured" id="howCaptured" placeholder={info.how_captured} />
                            </div>
            
                            <div className="addBird-whenCaptured">
                                <label htmlFor="whenCaptured">Quand a-t-il été capturé ?*</label>
                                <input type="date" name="whenCaptured" id="whenCaptured" placeholder={info.when_captured} />
                            </div>
            
                            <div className="addBird-whereCaptured">
                                <label htmlFor="whereCaptured">Où a-t-il été capturé ?*</label>
                                <input type="text" name="whereCaptured" id="whereCaptured" placeholder={info.where_captured}/>
                            </div>
                        
                            <div className="addBird-ringNumber">
                                <label htmlFor="ringNumber">Numéro de la bague</label>
                                <input type="text" name="ringNumber" id="ringNumber" placeholder={info.where_ring_number}/>
                            </div>
                        
                            <div className="addBird-takeover">
                                <p>Reprise ?</p>
                                <div className="addbird-takeover-wrap">
                                    <div>
                                        <label htmlFor="takeover">Oui</label>
                                        <input type="radio" name="takeover" id="takeover-yes" value="oui"/>
                                    </div>
                                    <div>
                                        <label htmlFor="takeover">Non</label>
                                        <input type="radio" name="takeover" id="takeover-no"value="non"/>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="addBird-submit">
                                <input type="submit" value="Ajouter l'oiseau"/>
                            </div>
                        </form>
                    </Fragment>
                )}
            
            {/* { redirectValue ? (<Redirect to="/capturelist"/>) : null } */}
        </div>
    )
}
