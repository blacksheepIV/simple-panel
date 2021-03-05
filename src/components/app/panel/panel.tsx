import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface GeoType{
  lat: number,
  lng:number
}
interface AddressType{
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo :GeoType
}
interface CompanyType{
  name: string,
  catchPhrase: string,
  bs: string
}
interface UserType{
  id: number,
  name: string,
  username: string,
  email: string,
  address: AddressType,
  phone: string,
  website: string,
  company : CompanyType
}
const Panel : React.FunctionComponent = ()=>{
  const DefaultUserList : UserType[] = []
  const [users, setUsers] : [UserType[], (users:UserType[])=>void] = useState(DefaultUserList)
  const [loading, setLoading] : [boolean, (loading:boolean)=>void] = useState<boolean>(true)
  const [error, setError] : [string, (error:string)=>void] = useState('')
  useEffect(()=>{
    axios.get<UserType[]>('https://jsonplaceholder.typicode.com/users', 
      { headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res=>{
        console.log(res)
        setUsers(res.data)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        switch (err.request.status) {
          case 404:
            setError('No User was found!')
            break
          case 401:
            setError('you don\'t have permission to access this content')
            break
          default:
            setError('oops!something went wrong!')
            break
        }
        setLoading(false)
      })
  }, [])
  return (
    <h2>Panel</h2>
  )
}
export default Panel