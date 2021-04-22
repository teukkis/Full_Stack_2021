import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from "react-router-dom"
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import BlogComment from './BlogComment'


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

const Blog = () => {
  const username = useSelector(state => state.user.username)
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)

  const handleRemove = async (blog) => {
    const result = window.confirm(`Remove blog: ${blog.title}`)

    if (result) {
      try {
        dispatch(removeBlog(blog.id))
        history.push('/blogs')
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleBlogLikeButton = async () => {
    
    try {
      if (blogs) {
        const blog = blogs.find(b => b.id === id)
        const likes = blog.likes + 1
        dispatch(likeBlog(blog.id, { likes: likes }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const renderBlog = () => {
    if (blogs) {
      const blog = blogs.find(b => b.id === id)
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
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem className={classes.listTitle}>
              <ListItemText primary={<Typography variant="h5">{blog.title}</Typography>} />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary={<Typography variant="body2">Url:</Typography>} />
              <ListItemText primary={<Typography variant="body1">{blog.url}</Typography>} />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary={<Typography variant="body2">Author:</Typography>} />
              <ListItemText primary={<Typography variant="body1">{blog.author}</Typography>} />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary={<Typography variant="body2">Likes:</Typography>} />
              <ListItemText primary={<Typography variant="body1">{blog.likes}</Typography>} />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText primary={<Typography variant="body2">Created by:</Typography>} />
              <ListItemText primary={<Typography variant="body1">{userCreated}</Typography>} />
            </ListItem>
          </List>
          <IconButton onClick={handleBlogLikeButton} color="primary">
            <ThumbUpIcon />
          </IconButton>
          { 
          isUserCreator 
          ? 
          <IconButton onClick={() => handleRemove(blog)}>
            <DeleteIcon />
          </IconButton> 
          : 
          <div></div>}
        </div>
      )
    }
    
  }

  return (
    <div className="blogItem">
      <Paper className={classes.paper} elevation={6}>
        { renderBlog() }
        <BlogComment/>
      </Paper>
    </div>
  )}

export default Blog