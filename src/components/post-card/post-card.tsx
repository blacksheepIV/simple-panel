import React, { FunctionComponent, useEffect, useState } from 'react'
import 'components/post-card/post-card.scss'
import { PostType, CommentType } from 'utils/interfaces/post-interface'
import axios from 'axios'
import { BiCommentDetail } from 'react-icons/bi'
import Modal from 'components/modal/modal'

interface PostCardType {
  post: PostType,
  className?:string,
  onClick?(): void
}
const PostCard: FunctionComponent<PostCardType> = ({ post, className, ...postCardProps }) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [error, setError] = useState<string>('')
  const [showComments, setShowComments] = useState<Boolean>(false)
  useEffect(()=>{
    axios.get<CommentType[]>(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`, 
      { headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res=>{
        console.log(res)
        setComments(res.data)
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
      })
  }, [])
  return (
    <>
      <div className={['postCard', className].join(' ')} {...postCardProps}>
        <div className="postCard__content">
          <span className="postCard__heading">{post.title}</span>

          <p className="postCard__heading--sub">{post.body}</p>


        </div>
        <button className="postCard__btn" type="button" onClick={()=>setShowComments(true)}>
          <BiCommentDetail /><span className="postCard__btnTxt">comments({comments.length})</span>
        </button>
      </div>
      {showComments && <Modal comments={comments} onClick={()=>{setShowComments(false)}} />}
    </>
  )
}

export default PostCard
