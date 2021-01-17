import React from 'react'
import {useParams} from 'react-router-dom'

export default function UserProfile() {

    let  {user}  = useParams();
    
    console.log(user);

    return (
        <div>
             {user}
        </div>
    )
}
