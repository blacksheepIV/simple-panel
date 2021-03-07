import React, { useState, useEffect } from 'react'
import Header from 'components/header/header'
import UserCard from 'components/user-card/user-card'
import Loading from 'components/loading/loading'
import UserType from 'utils/interfaces/user-interface'
import 'components/panel/panel.scss'
import axios from 'axios'


const Panel : React.FunctionComponent = ()=>{
  const DefaultUserList : UserType[] = []
  const DefaultRows : UserType[][] = []
  const [users, setUsers] : [UserType[], (users:UserType[])=>void] = useState(DefaultUserList)
  const [rows, setRows] :[UserType[][], (rows:UserType[][])=>void]  = useState(DefaultRows)
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
  useEffect(()=>{
    const newArrenge = []
    while (users.length > 0){
      newArrenge.push(users.splice(0, 2))
    }
    console.log(newArrenge)
    setRows(newArrenge)
  }, [users])
  return (
    <>
      {loading && <div className="loading__wrapper"><Loading /></div>}
      {!loading && (
        <div className="panel">
          <Header />
          <div className="panel__content">
            {rows.map((row, index)=>{
              const id = index * 10 + 1000
              return (
                <div className="panel__row" key={id}>
                  {row.map((item, i)=>{
                    const key = i * id + 1
                    return (<UserCard user={item} key={key} className="panel__userCard" />)
                  })}
                </div>
              )
            })}
          </div>
        </div>
      )}
      
    </>
  )
}
export default Panel