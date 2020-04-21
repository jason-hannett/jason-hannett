import React from 'react';
import {withRouter} from 'react-router-dom'
import routes from './routes'
import Nav from './Components/Nav'
import Playbar from './Components/Playbar'
import './App.css';

function App(props) {
  return (
    <div className="App">
       {props.location.pathname === '/' || props.location.pathname === '/upload' || props.location.pathname === '/register' || props.location.pathname === '/yes-no' || props.location.pathname === '/artist-info'
        ?(<>{routes}</>)
        :(<>
           <Nav/>
          {routes}
          <Playbar/>
        </>)
      } 
 
    </div>
  );
}

export default withRouter(App);
