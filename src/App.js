import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

import {logout} from './slices/auth'

function App(){

  const {user: currentUser} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <Router>
      <div>
        <nav>
          <Link to={"/"}>
            TodoApp
          </Link>
          {currentUser ? (
            <div>
              <li>
                {currentUser.email}
              </li>
              <li>
                <a href='/' onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to={"/"}>
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/" element={<Login />} />
          </Routes>
        </div>

      </div>
    </Router>
  )
}

export default App