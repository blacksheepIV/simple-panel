import React, { useState } from 'react'
import 'components/login/login.scss'

const Login = function (){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  function authenticate(e: React.FormEvent){
    e.preventDefault()
    console.log(e)
  }
  return (

    <div className="login">
      <form className="login__form" onSubmit={authenticate}>
        <div className="login__header">Login</div>
        <input className="login__input" placeholder="Username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input className="login__input" placeholder="Password" type="password" />
        <button className="login__submit" type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Login