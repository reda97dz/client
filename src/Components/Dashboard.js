import React from "react"
import {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux" 

const Dashboard = () => {
    const {user: currentUser} = useSelector((state) => state.auth)

    if (!currentUser){
        return <Navigate to='/' />
    }

    return (
        <div>
            <h1>{currentUser.first_name} {currentUser.last_name}</h1>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
        </div>
    )
}

export default Dashboard