import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import LogIn from './components/LogIn'

import Home from './components/Home'

import EachJobDetails from './components/EachJobDetails'

import JobDetails from './components/JobDetails'

import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path='/login' component={LogIn} />
    <ProtectedRoute exact path='/' component={Home} />
    <ProtectedRoute exact path='/jobs' component={JobDetails} />
    <ProtectedRoute exact path='/jobs/:id' component={EachJobDetails} />
    <ProtectedRoute exact path='/not-found' component={NotFound} />
    <Redirect to='/not-found' component={NotFound} />
  </Switch>
)

export default App
