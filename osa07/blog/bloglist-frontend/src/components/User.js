import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import { ListItemIcon, Typography } from '@material-ui/core'


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
}));

const Users = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const id = useParams().id
  const users = useSelector(state => state.users)

  const user = users.find(u => u.id === id)
  
  const renderUser = () => {
    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        {user.blogs.map((b, i) => {
          return (
            <ListItem key={i} className={classes.listItem}>
              <ListItemText primary={`${i + 1}. ${b.title}`} />
            </ListItem> 
            )
          })
        }
      </List>
    )
  }

  return (
    <div >
      <Typography className={classes.header} variant="h4">Added Blogs</Typography>
      {user ? renderUser() : <div></div>}
    </div>
  )
}

export default Users