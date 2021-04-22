import React from 'react'
import { Switch, Route } from "react-router-dom"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NavigationBar from './NavigationBar'
import Blogs from './Blogs'
import Users from './Users'
import User from './User'
import Blog from './Blog'

const ApplicationContainer = () => {

  return (
      <React.Fragment>
        <CssBaseline />
        <NavigationBar/>
        <Container fixed>
          <Switch>
            <Route path="/users/:id">
              <User/>
            </Route>
            <Route path="/blogs/:id">
              <Blog/>
            </Route>
            <Route path="/blogs">
              <Blogs/>
            </Route>
            <Route path="/users">
              <Users/>
            </Route>
          </Switch>
        </Container>
      </React.Fragment>

  )
}

export default ApplicationContainer