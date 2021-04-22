import React, { useState } from 'react'
import blogService from '../services/blogs'
import Message from './Message'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogService.createBlog(title, url, author)
      dispatch(setMessage(`${title} created successfully`))
      setTimeout( () => {
        props.newBlogFormRef.current.toggleVisibility()
        dispatch(setMessage(null))
      }, 3000)
      props.setUpdateBlogs(true)
    } catch (e) {
      console.log(e)
      dispatch(setMessage('Create a new blog did NOT succeed'))
      setTimeout( () => setMessage(null), 3000 )
    }
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div style={{ marginBottom: 15, marginTop: 10 }}>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label style={{ marginRight: 33 }} >title</label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: 40 }} >url</label>
          <input
            type="text"
            id="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: 17 }} >author</label>
          <input
            type="text"
            id="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <button id="create_new_blog_button" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default NewBlog