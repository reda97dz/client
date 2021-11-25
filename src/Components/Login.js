import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

import {login} from "../slices/auth"
import {clearMessage} from '../slices/message'

import styles from './login.module.css'

const Login = (props) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('reda@gmail.com')
    const [password, setPassword] = useState('test')

    const {isLoggedIn} = useSelector((state) => state.auth)
    const {message} = useSelector((state) => state.message)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])


    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        
        console.log({email, password})
        dispatch(login({email, password}))
            .unwrap()
            .then(() => {
                props.history.push("/dashboard")
                window.location.reload()
            })
            .catch(() => {
                setLoading(false)
            })
    }

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />
    }

    return (

        <div className={styles.container}>
            <div className={{width: 200}}>
                <h1>Login Page</h1>
                {
                    message ? (<p className={styles.error}> {message}</p>) : (null)
                }
                <form>
                    <div className={styles.loginForm}>
                        <div className={styles.loginFormItem}>
                            <label htmlFor="email">email</label>
                            <input type="text" id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}
                                disabled={loading}
                            />
                        </div>
                        <div className={styles.loginFormItem}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} 
                                disabled={loading} 
                            />   
                        </div>
                    </div>
                    <button onClick={handleLogin} disabled={loading} >Login</button>
                </form>
            </div>
        </div>
        // <div className={styles.container}>
        //     <div className={{width: 200}}>
        //         <h1>Login Page</h1>
        //         <Formik
        //             initialValues={initialValues}
        //             validationSchema={validationSchema}
        //             onSubmit={handleLogin}
        //         >
        //             <form>
        //                 <div className={styles.loginForm}>
        //                     <div className={styles.loginFormItem}>
        //                         <label htmlFor="email">email</label>
        //                         <Field name='email' type='text' />
        //                         <ErrorMessage 
        //                             name="email"
        //                             component="div"
        //                             className={styles.error}
        //                         />
        //                     </div>
        //                     <div className={styles.loginFormItem}>
        //                         <label htmlFor="password">password</label>
        //                         <Field name='password' type='password' />
        //                         <ErrorMessage 
        //                             name="password"
        //                             component="div"
        //                             className={styles.error}
        //                         />
        //                     </div>
        //                 </div>
        //                 <button type="submit" disabled={loading} >Login</button>
        //             </form>
        //         </Formik>
        //     </div>
        //     {message && (
        //         <p className={styles.error}> {message}</p>
        //     )}
        // </div>
    )
}

export default Login