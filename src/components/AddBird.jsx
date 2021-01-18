import React, {setState} from 'react'
import {Link} from 'react-router-dom'

export default function AddBird() {

    const handleSubmit = (e) => {
        
        console.log(e.target.elements);
    }

    return (
        <div>

            <Link to={'/home'}>Revenir a l'accueil</Link>

            <form action="" className="addBird" onSubmit={handleSubmit}>
                <div className="addBird-latinName">
                    <label htmlFor="latinName">Nom latin</label>
                    <input type="text" name="latinName" id="latinName"/>
                </div>
                
                <div className="addBird-wingLength">
                    <label htmlFor="wingLength">Longueur Alaire</label>
                    <input type="text" name="wingLength" id="wingLength"/>
                </div>

                <div className="addBird-weight">
                    <label htmlFor="weight">Poids</label>
                    <input type="text" name="weight" id="weight"/>
                </div>

                <div className="addBird-adiposity">
                    <label htmlFor="adiposity">Adiposité</label>
                    <input type="text" name="adiposity" id="adiposity"/>
                </div>

                <div className="addBird-latinName">
                    <label htmlFor="sex">Sexe</label>
                    <input type="text" name="sex" id="sex"/>
                </div>

                <div className="addBird-age">
                    <label htmlFor="age">Âge</label>
                    <input type="text" name="age" id="age"/>
                </div>

                <div className="addBird-howCaptured">
                    <label htmlFor="howCaptured">Comment a-t-il été capturé ?</label>
                    <input type="text" name="howCaptured" id="howCaptured"/>
                </div>

                <div className="addBird-whenCaptured">
                    <label htmlFor="whenCaptured">Quand a-t-il été capturé ?</label>
                    <input type="date" name="whenCaptured" id="whenCaptured"/>
                </div>

                <div className="addBird-whereCaptured">
                    <label htmlFor="whereCaptured">Où a-t-il été capturé ?</label>
                    <input type="text" name="whereCaptured" id="whereCaptured"/>
                </div>

                <div className="addBird-ringNumber">
                    <label htmlFor="ringNumber">Numéro de la bague</label>
                    <input type="text" name="ringNumber" id="ringNumber"/>
                </div>

                <div className="addBird-takeover">
                    <label htmlFor="takeover">Reprise ?</label>
                    <input type="checkbox" name="takeover" id="takeover"/>
                </div>

                <div className="addBird-submit">
                    <input type="submit" value="Ajouter l'oiseau"/>
                </div>
            </form>
        </div>
    )
}
