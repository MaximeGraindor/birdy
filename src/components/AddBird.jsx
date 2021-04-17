import React, {setState, useContext, useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Firebase from '../utils/firebase'
import {AuthContext} from '../utils/AuthContext'
import '../css/addBird.css'

const initialValues = {
    latinName: "",
    wingLength: "",
    weight: "",
    adiposity: "",
    age: "",
    howCaptured: "",
    whenCaptured: "",
    whereCaptured: "",
    ringNumber: "",
    takeover: "",
  };

export default function AddBird() {

    const [currentUser, setCurrentUser] = useContext(AuthContext)
    const [values, setValues] = useState(initialValues);
    const [redirectValue, setRedirectValue] = useState({
        redirect: false
    });

    // ERRORS
    const [latinNameErr, setLatinNameErr] = useState({})
    const [wingLengthErr, setWingLengthErr] = useState({})
    const [weightErr, setWeightErr] = useState({})
    const [adiposityErr, setAdiposityErr] = useState({})
    const [ageErr, setAgeErr] = useState({})
    const [howCapturedErr, setHowCapturedErr] = useState({})
    const [whenCapturedErr, setWhenCapturedErr] = useState({})
    const [whereCapturedErr, setWhereCapturedErr] = useState({})
    const [takeoverErr, setTakeoverErr] = useState({})
    
    const db = Firebase.firestore()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }

    useEffect(() => console.log(redirectValue), [redirectValue]);

    const validForm = () => {
        const latinNameErr = {}
        const wingLengthErr = {}
        const weightErr = {}
        const adiposityErr = {}
        const ageErr = {}
        const howCapturedErr = {}
        const whenCapturedErr = {}
        const whereCapturedErr = {}
        const takeoverErr = {}
        let isValid = true

        // Nom en latin
        if(values.latinName.trim().length < 5){
            latinNameErr.latinNameLength = "Le nom en latin est trop court"
            isValid = false
        }
        if(!values.latinName){
            latinNameErr.latinNameEmpty = "Veuillez remplir ce champ"
            isValid = false
        }

        // Longueur Alaire
        if(values.wingLength.trim().length < 1){
            wingLengthErr.wingLengthEmpty = "Veuillez remplir ce champs"
            isValid = false
        }
        if(!(/^\d+$/.test(values.wingLength))){
            wingLengthErr.wingLengthDigits = "Ce champs doit contenir que des chiffres"
            isValid = false
        }

        // Poids
        if(!values.weight){
            weightErr.weightEmpty = "Veuillez remplir ce champ"
            isValid = false
        }
        if(!(/^\d+$/.test(values.weight))){
            weightErr.weightErrDigits = "Ce champs doit contenir que des chiffres"
            isValid = false
        }

        // Adiposité
        if(!values.adiposity){
            adiposityErr.adiposityEmpty = "Veuillez remplir ce champ"
            isValid = false
        }
        if(!(/^\d+$/.test(values.adiposity))){
            adiposityErr.adiposityDigits = "Ce champs doit contenir que des chiffres"
            isValid = false
        }

        // Age
        if(!values.age){
            ageErr.ageEmpty = "Veuillez remplir ce champ"
            isValid = false
        }
        if(!(/^\d+$/.test(values.age))){
            ageErr.ageDigits = "Ce champs doit contenir que des chiffres"
            isValid = false
        }

        // Comment capturé
        if(!values.howCaptured){
            howCapturedErr.howCapturedEmpty = "Veuillez remplir ce champ"
            isValid = false
        }

        // quand capturé
        if(!values.whenCaptured){
            whenCapturedErr.whenCapturedEmpty = "Veuillez remplir ce champ"
            isValid = false
        }

        // où capturé
        if(!values.whereCaptured){
            whereCapturedErr.whereCapturedEmpty = "Veuillez remplir ce champ"
            isValid = false
        }

        // reprise
        if(!values.takeover){
            takeoverErr.takeoverEmpty = "Veuillez remplir ce champ"
            isValid = false
        }


        setLatinNameErr(latinNameErr)
        setWingLengthErr(wingLengthErr)
        setWeightErr(weightErr)
        setAdiposityErr(adiposityErr)
        setAgeErr(ageErr)
        setHowCapturedErr(howCapturedErr)
        setWhenCapturedErr(whenCapturedErr)
        setWhereCapturedErr(whereCapturedErr)
        setTakeoverErr(takeoverErr)
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validForm()

        if(isValid){
            db.collection("capture_list").add({
                latin_name: e.target.elements.latinName.value,
                slug: convertToSlug(e.target.elements.latinName.value),
                wing_length: e.target.elements.wingLength.value,
                weight: e.target.elements.weight.value,
                adiposity: e.target.elements.adiposity.value,
                sex: e.target.elements.sex.value,
                age: e.target.elements.age.value,
                how_captured: e.target.elements.howCaptured.value,
                when_captured: e.target.elements.whenCaptured.value,
                where_captured: e.target.elements.whereCaptured.value,
                ring_number: e.target.elements.ringNumber.value,
                takeover: e.target.elements.takeover.value,
                user_id: currentUser.uid,
                user_email: currentUser.email
            })
            db.collection("capture_list")
            .where('where_captured', '==', e.target.elements.whereCaptured.value)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
            })
            setRedirectValue({
                redirect: true
            })
        }
    }

    const convertToSlug = (Text) =>
    {
        return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
    }

    return (
        <div className="addBird">

            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <div className="addBird-top">
                <h1 className="addBird-title">
                    Ajouter un oiseau
                </h1>
            </div>

            <form action="#" className="addBird-form" onSubmit={handleSubmit}>
                <div className="addBird-latinName">
                    <label htmlFor="latinName">Nom latin*</label>
                    <input type="text" name="latinName" id="latinName" onChange={handleChange} value={values.latinName} />
                    {Object.keys(latinNameErr).map((key) => {
                        return <span className="addBird-error">{latinNameErr[key]}</span>
                    })}
                </div>
                
                <div className="addBird-wingLength">
                    <label htmlFor="wingLength">Longueur Alaire*</label>
                    <input type="text" name="wingLength" id="wingLength" onChange={handleChange} value={values.wingLength} />
                    {Object.keys(wingLengthErr).map((key) => {
                        return <span className="addBird-error">{wingLengthErr[key]}</span>
                    })}
                </div>

                <div className="addBird-weight">
                    <label htmlFor="weight">Poids*</label>
                    <input type="text" name="weight" id="weight" value={values.weight} onChange={handleChange} />
                    {Object.keys(weightErr).map((key) => {
                        return <span className="addBird-error">{weightErr[key]}</span>
                    })}
                </div>

                <div className="addBird-adiposity">
                    <label htmlFor="adiposity">Adiposité*</label>
                    <input type="text" name="adiposity" id="adiposity" value={values.adiposity} onChange={handleChange} />
                    {Object.keys(adiposityErr).map((key) => {
                        return <span className="addBird-error">{adiposityErr[key]}</span>
                    })}
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
                    <input type="text" name="age" id="age" value={values.age} onChange={handleChange}/>
                    {Object.keys(ageErr).map((key) => {
                        return <span className="addBird-error">{ageErr[key]}</span>
                    })}
                </div>

                <div className="addBird-howCaptured">
                    <label htmlFor="howCaptured">Comment a-t-il été capturé ?*</label>
                    <input type="text" name="howCaptured" id="howCaptured" value={values.howCaptured} onChange={handleChange}/>
                    {Object.keys(howCapturedErr).map((key) => {
                        return <span className="addBird-error">{howCapturedErr[key]}</span>
                    })}
                </div>

                <div className="addBird-whenCaptured">
                    <label htmlFor="whenCaptured">Quand a-t-il été capturé ?*</label>
                    <input type="date" name="whenCaptured" id="whenCaptured" value={values.whenCaptured} onChange={handleChange} />
                    {Object.keys(whenCapturedErr).map((key) => {
                        return <span className="addBird-error">{whenCapturedErr[key]}</span>
                    })}
                </div>

                <div className="addBird-whereCaptured">
                    <label htmlFor="whereCaptured">Où a-t-il été capturé ?*</label>
                    <input type="text" name="whereCaptured" id="whereCaptured" value={values.whereCaptured} onChange={handleChange}/>
                    {Object.keys(whereCapturedErr).map((key) => {
                        return <span className="addBird-error">{whereCapturedErr[key]}</span>
                    })}
                </div>

                <div className="addBird-ringNumber">
                    <label htmlFor="ringNumber">Numéro de la bague</label>
                    <input type="text" name="ringNumber" id="ringNumber" value={values.ringNumber} onChange={handleChange}/>
 
                </div>

                <div className="addBird-takeover">
                    <p>Reprise ?</p>
                    <div className="addbird-takeover-wrap">
                        <div>
                            <label htmlFor="takeover">Oui</label>
                            <input type="radio" name="takeover" id="takeover-yes" value={values.takeover} onChange={handleChange} value="oui"/>
                        </div>
                        <div>
                            <label htmlFor="takeover">Non</label>
                            <input type="radio" name="takeover" id="takeover-no" value={values.takeover} onChange={handleChange} value="non"/>
                        </div>
                    </div>
                    {Object.keys(takeoverErr).map((key) => {
                        return <span className="addBird-error">{takeoverErr[key]}</span>
                    })}
                </div>

                <div className="addBird-submit">
                    <input type="submit" value="Ajouter l'oiseau"/>
                </div>
            </form>
            {/* { redirectValue ? (<Redirect to="/capturelist"/>) : null } */}
        </div>
    )
}
