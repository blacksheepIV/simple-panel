import React, { FunctionComponent, useContext } from 'react'
import UserContext from 'contexts/user-context'
import 'components/header/header.scss'
import { IoMdLogOut } from 'react-icons/io'

interface HeaderType {
  className?:string,
}
const Header:FunctionComponent<HeaderType> = ({ className, ...userCardProps })=>{
  const userContext = useContext(UserContext)

  function signOut(){
    userContext.logOut()
  }
  return (
    <div className={['header', className].join(' ')} {...userCardProps}>
      <span className="bold">Welcome {userContext.user.username}!</span>
      <button type="button" className="header__btn" onClick={signOut}><IoMdLogOut />Logout</button>
    </div>
  )
}
export default Header