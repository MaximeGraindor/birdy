import React from 'react'
import Firebase from '../utils/firebase'

export default function Home() {
    return (
        <div>
            <p>
                Home
            </p>
            <button onClick={() => Firebase.auth().signOut()}> 
                Sign Out
            </button>
        </div>
    )
}
