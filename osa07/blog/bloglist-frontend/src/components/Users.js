import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { Route, Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { setUsers } from '../reducers/usersReducer'

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
  }
}));

const Users = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  
  useEffect(() => {
    dispatch(setUsers())
  }, [])

  const handleUserClick = (id) => {
    history.push(`users/${id}`)
  }

  const renderUsers = () => {
    return (
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem className={classes.listTitle} button>
          <ListItemText primary={<Typography variant="h6">Users</Typography>} />
          <ListItemText primary={<Typography variant="h6">Created Blogs</Typography>} />
        </ListItem>
          {users.map(u => {
            return(
              <ListItem onClick={() => handleUserClick(u.id)} key={u.id} className={classes.listItem} button>
                <ListItemText primary={u.username} />
                <ListItemText primary={u.blogs.length} />
              </ListItem>            
            )
          })
          }
      </List>
    )
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant="h4">Users</Typography>
      {users !== null ? renderUsers(): <div></div>}
    </div>
  )
}

export default Users