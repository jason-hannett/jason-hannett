import React from 'react';
import {Link} from 'react-router-dom'

function Yesno(props) {
  return (
    <div className="yesno-container"> 
        <h2>Are you an artist?</h2>
       <Link to='/artist-info'><button>Yes</button></Link>
       <Link to='/dashboard'><button>No</button></Link>
    </div>
  );
}

export default Yesno;
