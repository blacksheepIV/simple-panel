import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from 'components/loading/loading'
import Header from 'components/header/header'
import PostCard from 'components/post-card/post-card'
import { PostType } from 'utils/interfaces/post-interface'
import 'components/plp/plp.scss'
import axios from 'axios'


const PostsListingPage : React.FunctionComponent = ()=>{
  const { userId } = useParams()
  const DefaultPostsList : PostType[] = []
  const DefaultRows : PostType[][] = []
  const [posts, setPosts] = useState<PostType[]>(DefaultPostsList)
  const [rows, setRows] = useState<PostType[][]>(DefaultRows)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  useEffect(()=>{
    axios.get<PostType[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, 
      { headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res=>{
        console.log(res)
        
        setPosts(res.data)
        setLoading(false)
      })
      .catch(err=>{
        switch (err.request.status) {
          case 404:
            setError('No post was found!')
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
    while (posts.length > 0){
      newArrenge.push(posts.splice(0, 2))
    }
    console.log(newArrenge)
    setRows(newArrenge)
  }, [posts, userId])
  return (
    <>
      {loading && <div className="loading__wrapper"><Loading /></div>}
      {!loading && (
      <div className="plp">
        <Header />
        <div className="plp__content">
          {rows.map((row, index)=>{
            const id = index * 10 + 1000
            return (
              <div className="plp__row" key={id}>
                {row.map((item, i)=>{
                  const key = i * id + 1
                  return (<PostCard post={item} key={key} className="plp__userCard" />)
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
export default PostsListingPage