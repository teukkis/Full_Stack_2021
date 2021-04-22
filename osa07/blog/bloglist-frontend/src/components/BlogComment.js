import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { addComment } from '../reducers/blogReducer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2)
  }
}));

const BlogComment = () => {
  const classes = useStyles()
  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const dispatch = useDispatch()

  const handleComment = () => {
    dispatch(addComment(id, comment))
    setComment('')
  }

  const renderComments = () => {
    if (blogs) {
      const blog = blogs.find(b => b.id === id)

      if (!blog.comments) {
        return <Typography>no data</Typography>
      }

      if (blog.comments.length === 0) {
        return <Typography variant="body2">no comments</Typography>
      }
      return (
        <List>
            {blog.comments.map((comment, i) => {
              return(
                <ListItem key={i} className={classes.listItem}>
                  <ListItemText primary={comment} />
                </ListItem>            
              )
            })
            }
        </List>
      )
    }
  }

  return (
    <div className={classes.container}>
      <Typography variant="h5">Comments</Typography>
      <div>
        <TextField 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          id="standard-basic" 
          label="comment..."/ >
        <Button 
        onClick={handleComment}
        >
          Comment
        </Button>
      </div>
      <div>
        {renderComments()}
      </div>
    </div>
  )
}

export default BlogComment