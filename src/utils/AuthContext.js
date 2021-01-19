import React, {useEffect, useState, createContext} from 'react'
import firebase from './firebase'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {

        firebase.auth().onAuthStateChanged(setCurrentUser);

    }, [])
    
    return(
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {props.children}
        </AuthContext.Provider>
    )
}