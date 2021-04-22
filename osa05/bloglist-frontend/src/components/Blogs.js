import React, { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Message from './Message'
import Blog from './Blog'


const Blogs = (props) => {
  const [updateBlogs, setUpdateBlogs] = useState([])
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
    .then( response => {
      setBlogs(response)
    })
  }, [updateBlogs])

  const createBlogForm = () => (
    <Togglable buttonLabel="New blog" ref={newBlogFormRef}>
      <NewBlog newBlogFormRef={newBlogFormRef} setUpdateBlogs={setUpdateBlogs}/>
    </Togglable>
  )

  const renderBlogs = () => {
    if (blogs !== null) {
      return (
        blogs.map((b, i) => {
          return <Blog setMessage={setMessage} key={i} setBlogs={setBlogs} username={props.user.username} blog={b} blogs={blogs}/>
        })
      )
     
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser')
    props.setUser(null)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Message message={message}/>
      <div style={{paddingBottom: '20px'}}>
        <p style={{display: 'inline', paddingRight: '10px'}}>{props.user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      
      {createBlogForm()}
      <br/>
        { renderBlogs() }
    </div>
  )
}


export default Blogs