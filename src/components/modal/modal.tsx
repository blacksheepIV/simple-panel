import React, { FunctionComponent } from 'react'
import { CommentType } from 'utils/interfaces/post-interface'
import 'components/modal/modal.scss'

interface ModalType {
  comments: CommentType[],
  className?:string,
  onClick?(): void
}

const Modal:FunctionComponent<ModalType> = ({ comments, className, ...postCardProps })=>(
  <div className="modal__wrapper" {...postCardProps}>
    <div className={['modal', className].join(' ')}>
      {comments.map((comment, index)=>{
        const id = index * 100 + 2000
        return (
          <div className='modal__comment' key={id}>
            <span className="modal__commentHeading">{comment.name}</span>
            <p className="modal__commentSubHeading">{comment.email}</p>
            <p className="modal__commentContent">{comment.body}</p>
          </div>)
      })}
    </div>
  </div>
)

export default Modal