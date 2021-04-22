import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { setUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    padding: theme.spacing(3),
    height: 60
  },
  logout: {
    marginLeft: 'auto',
    marginRight: 0,
    height: 60
  },
  user: {
    margin: 'auto'
  },
  appBar: {
    backgroundColor: '#aaaaaa'
  }
}));

const NavigationBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.username)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  return (
    <AppBar className={classes.appBar} position="static" color="default">
      <Toolbar>
        <Button className={classes.menuButton} component={Link} to="/users">Users</Button>
        <Button className={classes.menuButton} component={Link} to="/Blogs">Blogs</Button>
        <Typography variant="body1" className={classes.user}>{user}</Typography>
        <Button className={classes.logout} onClick={handleLogout}>
          <Typography >Logout</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar