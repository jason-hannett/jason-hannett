import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Track from './Components/Track'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/register' component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/upload' component={Track}/>
    </Switch>
)