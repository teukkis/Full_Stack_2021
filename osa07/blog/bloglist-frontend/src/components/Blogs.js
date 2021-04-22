import React, { useState, useEffect, useRef } from 'react'

import NewBlog from './NewBlog'
import { initBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Route, Link, useHistory, useParams } from "react-router-dom"
import Paper from '@material-ui/core/Paper';

import Message from './Message'
import { setUser } from '../reducers/userReducer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    width: "70%",
  },
  header: {
    marginTop: 20,
    marginBottom: 20
  },
  listItem: {
    height: '2.5em'
  },
  listTitle: {
    font: 'bold'
  },
  paper: {
    marginTop: 40,
    width: 600,
    paddingBottom: 20
  }
}));


const Blogs = () => {
  const classes = useStyles()
  const history = useHistory()

  const [updateBlogs, setUpdateBlogs] = useState([])
  const newBlogFormRef = useRef()

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.username)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initBlogs())
  }, [updateBlogs])

  const handleBlogClick = (id) => {
    history.push(`blogs/${id}`)
  }

  const createBlogForm = () => (
    <Togglable buttonLabel="New blog" ref={newBlogFormRef}>
      <NewBlog newBlogFormRef={newBlogFormRef} setUpdateBlogs={setUpdateBlogs}/>
    </Togglable>
  )

  const renderBlogs = () => {
    if (blogs !== null) {
      return (
        <List component="nav" className={classes.root} aria-label="contacts">

        {blogs.map(blog => {
          return (
            <ListItem onClick={() => handleBlogClick(blog.id)} key={blog.id} className={classes.listItem} button>
              <ListItemText primary={blog.title} />
            </ListItem>
          )
        })}
        </List>
      )
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Message />
      {createBlogForm()}
      <br/>
      <Paper className={classes.paper} elevation={6}>
        { renderBlogs() }
      </Paper>
      
    </div>
  )
}


export default Blogs