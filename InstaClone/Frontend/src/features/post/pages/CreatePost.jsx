import React, { useState, useRef } from 'react'
import '../style/createpost.scss'
import usePost from '../hook/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

    const [caption, setCaption] = useState('')

    const postImageInputFieldRef = useRef(null)

    const Navigate = useNavigate()

    const {loading, handleCreatePost} = usePost()

    async function handleSubmit(e){
        e.preventDefault()
        const file = postImageInputFieldRef.current.files[0]

        await handleCreatePost(file, caption)

        Navigate('/')

    }
    if(loading){
        return(
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

  return (
   <main className='create-post-page'>
     <div className="form-container">
        <h1>Create post</h1>
        <form onSubmit={handleSubmit}>
            <label className='post-image-label' htmlFor="postImage">Upload Image</label>
            <input ref={postImageInputFieldRef} hidden type="file" name='postImage' id='postImage' />
            <input 
            value={caption}
            onChange={(e) =>{setCaption(e.target.value)}}
            type="text" name='caption' id='caption' placeholder='Write a caption...' />
            <button className=''>Create Post</button>
        </form>
     </div>
   </main>
  )
}

export default CreatePost
