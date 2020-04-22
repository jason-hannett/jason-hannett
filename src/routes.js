import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Track from './Components/Track'
import Artistinfo from './Components/Artistinfo'
import Yesno from './Components/Yesno'
import Likes from './Components/Likes'
import Song from './Components/Song'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/register' component={Auth}/>
        <Route path='/artist-info' component={Artistinfo}/>
        <Route path='/yes-no' component={Yesno}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/song/:id' component={Song}/>
        <Route path='/edit-song/:id' component={Song}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/likes' component={Likes}/>
        <Route path='/upload' component={Track}/>
    </Switch>
)