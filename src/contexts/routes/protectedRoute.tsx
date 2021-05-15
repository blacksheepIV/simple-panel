import React, { FunctionComponent, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from 'contexts/user-context'

interface ProtecteType {
  path: string,
  component: FunctionComponent
  
}
const ProtectedRoute :FunctionComponent<ProtecteType> = ({ ...props })=>{
  const userContext = useContext(UserContext)
  return (
    userContext.isAuthenticated ? <Route {...props} /> : <Redirect to="/" />
  )
}
export default ProtectedRoute
