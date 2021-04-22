import React, { useState } from 'react'
import blogService from '../services/blogs'
import './index.css'

const Blog = ({blogs, blog, username, setBlogs, setMessage}) => {

  const [fullView, setFullView] = useState(false)

  const handleRemove = async () => {
    const result = window.confirm(`Remove blog: ${blog.title}`)
    if (result) {
      try {
        const updatedBlogs = blogs.filter(b => b.id !== blog.id )
        setBlogs(updatedBlogs)
        setMessage('blog removed')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        blogService.removeBlog(blog.id)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleBlogLikeButton = async () => {
    try {
      const updatedBlogs = blogs.map(b => b.id === blog.id ? {...b, likes: blog.likes + 1} : b )
      setBlogs(updatedBlogs)
      blogService.addOneLike(blog.id, {likes: blog.likes + 1})
    } catch (e) {
      console.log(e)
    }
  }

  const renderPreView = () => {
    return (
      <div>
        <p style={{display: 'inline', paddingRight: '10px'}}>{blog.title}</p>
        <button onClick={() => setFullView(true)}>view</button>
      </div>
    )
  }

  const renderFullView = () => {
    let userCreated = 'a bot'
    let isUserCreator = false
    
    if (blog.user) {
      userCreated = blog.user.username
      if (blog.user.username === username) {
        isUserCreator = true
      }
    }
    return (
      <div>
        <p style={{display: 'inline', paddingRight: '10px'}}>{blog.title}</p>
        <button onClick={() => setFullView(true)}>view</button>
        <p>{blog.url}</p>
        <p style={{display: 'inline', paddingRight: '10px'}}>{blog.likes}</p>
        <button onClick={handleBlogLikeButton}>like</button>
        <p>{userCreated}</p>
        {isUserCreator ? <button onClick={handleRemove}>remove</button> : <div></div>}
      </div>
    )
  }

  return (
    <div className="blogItem">
      { fullView ? renderFullView() : renderPreView() }
    </div>
  )
}

export default Blog