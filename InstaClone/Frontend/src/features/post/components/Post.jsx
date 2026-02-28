import React from 'react'

const Post = ({user, post, handleLike, handleUnLike }) => {


  return (
    <div className='post'>
       <div className="user">
                    <div className="userimg">
                       <img src="https://images.unsplash.com/photo-1603645706164-0e4058e80f03?q=80&w=1052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <p>{user.username}</p>
                </div>
                <img src={post.imgUrl} alt="" />
                <div className="icons">
                    <div className="left">
                        <button><i className={post.isLiked?"like":""} 
                        onClick={() => {post.isLiked? handleUnLike(post._id) : handleLike(post._id)}} 
                        class="ri-heart-line"></i></button>
                        <button><i class="ri-chat-4-line"></i></button>
                        <button><i class="ri-send-plane-2-line"></i></button>
                    </div>
                    <div className="right">
                        <button><i class="ri-sticky-note-2-line"></i></button>
                    </div>
                </div>
                <div className="bottom">
                    <p className='caption'>{post.caption}</p>
                </div>
    </div>
  )
}

export default Post
