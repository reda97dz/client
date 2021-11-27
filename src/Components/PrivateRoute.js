import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from "react-redux" 
import Layout from './Layout'

const PrivateRoute = () => {
    const {user: currentUser} = useSelector((state) => state.auth)
    
    return (
        !Boolean(currentUser.token) ? <Navigate to="/" /> : <Layout><Outlet /></Layout>
        // <Route 
        //     path={path}
        //     render={props =>
        //         !Boolean(currentUser.token) ? (
        //             <Navigate to='/' />
        //         ):(
        //             <Layout>
        //                 <Component />
        //             </Layout>
        //         ) 
        //     } 
        // />
    )
}

export default PrivateRoute