import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import AppLogin from './pages/AppLogin'
import StudyList from './pages/StudyList'

const AppRouter = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <AppLogin />
          </Route>
          <Route exact path="/">
            <StudyList />
          </Route>
        </Switch>
      </Router>
    )
  }
  
  AppRouter.defaultProps = {}
  
  AppRouter.propTypes = {}
  
  export default AppRouter