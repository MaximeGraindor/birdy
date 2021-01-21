import React from 'react'
import { Link } from 'react-router-dom'
import '../css/bandingSite.css'

export default function BandingSite() {
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
            </div>

        </div>
    )
}
