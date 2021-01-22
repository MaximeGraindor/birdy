import React, {useEffect, useState, useContext} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon} from "react-google-maps"
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import {AuthContext} from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import Firebase from '../utils/firebase'
import '../css/addBandingSite.css'

export default function AddBandingSite() {

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [currentUser, setCurrentUser] = useContext(AuthContext)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
              });
          } else {
            console.log("Not Available");
          }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const db = Firebase.firestore()
        db.collection("banding_site").add({
            name: e.target.elements.name.value,
            position: {
                latitude: e.target.elements.latitude.value,
                longitude: e.target.elements.longitude.value 
            },
            area: 50.50,
            user_id: currentUser.uid
        })
    }


    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap defaultZoom={7} defaultCenter={{ lat: latitude, lng: longitude }}>
            {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} />}
            <DrawingManager />
        </GoogleMap>
    ))

    return (
        <div className="addBandingSite">
            <div className="backHome-wrap">
                <Link to={'/home'} className="back-to-home">Revenir a l'accueil</Link>
            </div>
            <div className="addBandingSite-top">
                <h1 className="addBandingSite-title">
                    Ajouter un site
                </h1>
            </div>

            <div className="addBandingSite-form">
                <form action="" onSubmit={handleSubmit}>
                    <div className="bandingSite-name">
                        <label htmlFor="name">Nom du lieu</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="bandingSite-latitude">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" name="latitude" id="latitude" value={latitude} />
                    </div>
                    <div className="bandingSite-longitude">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" name="longitude" id="longitude" value={longitude}/>
                    </div>
                    <div className="bandingSite-submit">
                        <input type="submit" value="Envoyer"/>
                    </div>
                </form>
            </div>

            <div className="addBandingSite-maps">
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
            
        </div>
    )
}
