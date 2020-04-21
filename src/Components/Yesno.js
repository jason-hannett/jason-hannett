import React from 'react';
import {Link} from 'react-router-dom'

function Yesno(props) {
  return (
    <div className='auth-background'>
      <div className="yesno-container"> 
          <h2 className='yes-no-header'>Are you an artist?</h2>
        <Link to='/artist-info'><button className='login-button'>Yes</button></Link>
        <Link to='/dashboard'><button className='login-button'>No</button></Link>
      </div>
    </div>
  );
}

export default Yesno;
