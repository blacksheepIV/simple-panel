import React, { FunctionComponent, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import UserContext from 'contexts/user-context'
import { useHistory } from 'react-router-dom'
import 'components/login/login.scss'

type FormDataType = {
  username: string,
  password: string
}
  
const Login : FunctionComponent = function (){
  const history = useHistory()
  const userContext = useContext(UserContext)
  const { register, handleSubmit, errors } = useForm()
  function authenticate(data : FormDataType){
    
    console.log(data)
    if (data.username === 'legamart' && data.password === 'legamart'){
      userContext.login(data)
    } else {
      alert('either username or password is not correct!')
    }
       
  }
  useEffect(()=>{
    
    if (userContext.isAuthenticated)
      history.push('/panel')
  }, [])

  return (

    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(authenticate)}>
        <div className="login__header">Login</div>
        <input className="login__input" placeholder="Username" type="text" name="username" ref={register({ required:true })} />
        {errors.username && <span className="login__error">username is required</span>}
        <input className="login__input" placeholder="Password" type="password" name="password" ref={register({ required:true, minLength:8 })} />
        {errors.password && errors.password.type === 'required' && <span className="login__error">password is required</span>}
        {errors.password && errors.password.type === 'minLength' && <span className="login__error">password must be minimum of 8 characters</span>}
        <button className="login__submit" type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Login