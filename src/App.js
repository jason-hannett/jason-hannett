import React from 'react';
import {withRouter} from 'react-router-dom'
import routes from './routes'
import Nav from './Components/Nav'
import './App.css';

function App(props) {
  return (
    <div className="App">
       {props.location.pathname === '/' || props.location.pathname === '/upload' || props.location.pathname === '/register'
        ?(<>{routes}</>)
        :(<>
           <Nav/>
          {routes}
        </>)
      } 
 
    </div>
  );
}

export default withRouter(App);
