import React, { useState } from 'react'
import  UserContext  from 'contexts/user-context'
import { useHistory } from 'react-router-dom'

const UserState = (props)=>{
  const history = useHistory()
  const defaultUser = JSON.parse(localStorage.getItem('user')) || null
  const defaultAuthStatus = (defaultUser !== null)
  const [user, setUser] = useState(defaultUser)
  const [isAuthenticated, setisAuthenticated] = useState(defaultAuthStatus)

  function login(loggedInUser){
    setTimeout(()=>{
      setUser(loggedInUser)
      setisAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      history.push('/panel')
    }, 1000)
  }

  function logOut(){
    setTimeout(()=>{
      localStorage.removeItem('user')
      setisAuthenticated(false)
      history.push('/')
    }, 1000)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logOut
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
export default UserState